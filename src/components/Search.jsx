// компонент Поиск
import { useEffect, useRef } from "react";

export default function Search ({ query, setQuery })
{
  const inputEl = useRef(null);

  //фокус на input Serch по нажатию на Enter
  useEffect(function ()
  {
    function listenEnter (e)
    {
      console.log('enter');
      if (document.activeElement === inputEl.current) return;
      if (e.key === 'Enter')
      {
        inputEl.current.focus();
        setQuery('');
        console.log('enter');
      }
    }

    document.addEventListener('keydown', listenEnter);
    return () => document.removeEventListener('keydown', listenEnter);
  }, [setQuery]);

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