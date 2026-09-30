import { Check, X } from "lucide-react";
import FriendB from "./friendButton";

function FriendRB({ usersId }) {
  return (
    <div className="flex gap-7">
      <Check color="white" className="cursor-pointer" />
      <X color="white" className="cursor-pointer" />
      <FriendB usersId={usersId} />
    </div>
  );
}

export default FriendRB;
