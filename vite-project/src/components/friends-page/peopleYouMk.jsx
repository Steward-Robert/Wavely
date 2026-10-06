import Button from "../addFriendsbutton";
import VerifiedBadge from "../VerifiedBadge.jsx";

function PeopleYouMK({ allUser, searchTerm = "" }) {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchingUsers = allUser.filter((user) =>
    (user.name ?? "").toLowerCase().includes(normalizedSearch),
  );

  return (
    <div>
      {matchingUsers.map((users) => {
        return (
          <main
            key={users.id}
            className="group flex min-h-[68px] items-center justify-between gap-3 border-b border-white/8 px-2 transition-colors last:border-b-0 hover:bg-white/[0.04]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-full border border-white/15 bg-white/5 p-0.5">
                {users.avatars?.[0]?.avatar && (
                  <img
                    src={users.avatars[0].avatar}
                    alt={users.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                )}
              </div>
              <div className="flex min-w-0 items-center gap-1.5">
                <h2 className="truncate text-sm font-medium text-white">
                  {users.name}
                </h2>
                {users.role === "ADMIN" && (
                  <VerifiedBadge className="h-4 w-4 shrink-0" />
                )}
              </div>
            </div>

            <Button usersId={users.id} />
          </main>
        );
      })}
      {matchingUsers.length === 0 && (
        <p className="px-2 py-6 text-center text-sm text-slate-400">
          {normalizedSearch
            ? "No matching people found."
            : "No people to show yet."}
        </p>
      )}
    </div>
  );
}
export default PeopleYouMK;
