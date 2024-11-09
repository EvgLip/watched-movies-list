import { useEffect } from "react";

//выполнение переданной в аргументе функции
//по нажатию определенной клавиши

export function useKeyEffect (key, action)
{
  useEffect(function ()
  {
    function listenKeyDown (e)
    {
      console.log(e.key);
      if (e.key.toLowerCase() === key.toLowerCase()) action();
    }
    document.addEventListener('keydown', listenKeyDown);

    return () => document.removeEventListener('keydown', listenKeyDown);
  }, [key, action]);
}