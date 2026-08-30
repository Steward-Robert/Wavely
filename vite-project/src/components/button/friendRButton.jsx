import { Check, X, EllipsisVertical } from "lucide-react";

function FriendRB() {
  return (
    <div className="flex gap-7">
      <Check color="white" className="cursor-pointer" />
      <X color="white" className="cursor-pointer" />
      <EllipsisVertical color="white" className="cursor-pointer" />
    </div>
  );
}

export default FriendRB;
