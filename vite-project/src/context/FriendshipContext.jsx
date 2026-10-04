import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import FriendshipContext from "./FriendshipContext";
import {
  acceptFriendRequest as acceptRequest,
  cancelFriendRequest as cancelRequest,
  fetchFriends,
  fetchReceivedRequests,
  fetchSentRequests,
  sendFriendRequest as sendRequest,
} from "../services/friendships";

export function FriendshipProvider({ user, children }) {
  const [friends, setFriends] = useState([]);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [friendsError, setFriendsError] = useState("");
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [requestsError, setRequestsError] = useState("");
  const [localOutgoingRequestIds, setLocalOutgoingRequestIds] = useState([]);

  const refreshFriends = useCallback(
    async (signal) => {
      if (!user?.id) {
        setFriends([]);
        setFriendsError("");
        return;
      }

      setFriendsLoading(true);
      setFriendsError("");
      try {
        const result = await fetchFriends(signal);
        if (!Array.isArray(result)) {
          throw new Error("The friends response was not a list.");
        }
        setFriends(result);
      } catch (error) {
        if (signal?.aborted) return;
        setFriendsError(
          error.response?.data?.message ||
            error.message ||
            "Could not load your friends. Please try again.",
        );
      } finally {
        if (!signal?.aborted) setFriendsLoading(false);
      }
    },
    [user?.id],
  );

  const refreshRequests = useCallback(
    async (signal) => {
      if (!user?.id) {
        setSentRequests([]);
        setReceivedRequests([]);
        return;
      }

      setRequestsLoading(true);
      setRequestsError("");
      try {
        const [sent, received] = await Promise.all([
          fetchSentRequests(signal),
          fetchReceivedRequests(signal),
        ]);
        if (!Array.isArray(sent) || !Array.isArray(received)) {
          throw new Error("The friend requests response was not a list.");
        }
        setSentRequests(sent);
        setReceivedRequests(received);
        setLocalOutgoingRequestIds([]);
      } catch (error) {
        if (signal?.aborted) return;
        setRequestsError(
          error.response?.data?.message ||
            error.message ||
            "Could not load friend requests. Please try again.",
        );
      } finally {
        if (!signal?.aborted) setRequestsLoading(false);
      }
    },
    [user?.id],
  );

  useEffect(() => {
    if (!user?.id) return undefined;

    const controller = new AbortController();
    Promise.resolve().then(() => {
      refreshFriends(controller.signal);
      refreshRequests(controller.signal);
    });
    return () => controller.abort();
  }, [refreshFriends, refreshRequests, user?.id]);

  const sendFriendRequest = useCallback(async (userId) => {
    await sendRequest(userId);
    setLocalOutgoingRequestIds((ids) =>
      ids.includes(userId) ? ids : [...ids, userId],
    );
    await refreshRequests();
  }, [refreshRequests]);

  const cancelFriendRequest = useCallback(async (userId) => {
    await cancelRequest(userId);
    setLocalOutgoingRequestIds((ids) => ids.filter((id) => id !== userId));
    setSentRequests((requests) =>
      requests.filter((request) => request.receiverId !== userId),
    );
    await refreshRequests();
  }, [refreshRequests]);

  const acceptFriendRequest = useCallback(
    async (requestId) => {
      await acceptRequest(requestId);
      setReceivedRequests((requests) =>
        requests.filter((request) => request.id !== requestId),
      );
      await refreshFriends();
      await refreshRequests();
    },
    [refreshFriends, refreshRequests],
  );

  const outgoingRequestIds = useMemo(
    () =>
      [
        ...new Set([
          ...sentRequests.map((request) => request.receiverId),
          ...localOutgoingRequestIds,
        ]),
      ],
    [sentRequests, localOutgoingRequestIds],
  );

  const value = useMemo(
    () => ({
      friends,
      friendsLoading,
      friendsError,
      sentRequests,
      receivedRequests,
      requestsLoading,
      requestsError,
      outgoingRequestIds,
      refreshFriends,
      refreshRequests,
      sendFriendRequest,
      cancelFriendRequest,
      acceptFriendRequest,
    }),
    [
      friends,
      friendsLoading,
      friendsError,
      sentRequests,
      receivedRequests,
      requestsLoading,
      requestsError,
      outgoingRequestIds,
      refreshFriends,
      refreshRequests,
      sendFriendRequest,
      cancelFriendRequest,
      acceptFriendRequest,
    ],
  );

  return (
    <FriendshipContext.Provider value={value}>
      {children}
    </FriendshipContext.Provider>
  );
}
