import { useState, useEffect } from "react";
// хук для сохранения и извлечения данных
// из Local Storage

export function useLocalStorageState (initialSate, key)
{
  const [value, setValue] = useState(function ()
  {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialSate;
  }
  );

  //помещение watched в localStorage
  useEffect(function ()
  {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}