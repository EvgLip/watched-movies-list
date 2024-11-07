// компонент Box
import { useState } from "react";

export default function Box ({ classExt, children })
{
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className={`btn-toggle ${classExt}`}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}