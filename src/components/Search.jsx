import { useRef } from "react";
import { useKeyEffect } from "./hooks/useKeyEffect";

// компонент Поиск
export default function Search ({ query, setQuery })
{
  const inputEl = useRef(null);

  //фокус на input Serch и его очистка по нажатию на Enter
  useKeyEffect('Enter', focusAndClean);

  function focusAndClean ()
  {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    setQuery('');
    console.log('enter');

  }

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}