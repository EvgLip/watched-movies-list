// вывод сообщения об ошибке

export default function ErrorMassage ({ massage })
{

  return (
    <p className="error">
      <span>⛔ </span>
      {massage}
    </p>
  );
}