import api from "./api";

export async function fetchFriends(signal) {
  const response = await api.get("/allFriend", { signal });
  return response.data.friends;
}

export async function fetchSentRequests(signal) {
  const response = await api.get("/sentRequests", { signal });
  return response.data.sentRequests;
}

export async function fetchReceivedRequests(signal) {
  const response = await api.get("/receivedRequests", { signal });
  return response.data.receivedRequests;
}

export async function sendFriendRequest(userId) {
  return api.post(`/sendRequest/${encodeURIComponent(userId)}`);
}

export async function cancelFriendRequest(userId) {
  return api.delete(`/refuse/${encodeURIComponent(userId)}`);
}

export async function acceptFriendRequest(requestId) {
  return api.post(`/accept/${encodeURIComponent(requestId)}`);
}
