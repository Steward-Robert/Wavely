import { CirclePlus, Check } from "lucide-react";
import { useState } from "react";

function Button() {
  const [sendInv, setSendInv] = useState(false);

  return (
    <div className="mr-4">
      {sendInv ? (
        <Check
          color="gray"
          onClick={() => setSendInv(!sendInv)}
          className="cursor-pointer"
          size={30}
        />
      ) : (
        <CirclePlus
          className="cursor-pointer"
          color="gray"
          size={30}
          onClick={() => setSendInv(!sendInv)}
        />
      )}
    </div>
  );
}

export default Button;
