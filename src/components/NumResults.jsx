// компонент Кол-во результатов (поиска)

export default function NumResults ({ movies })
{

  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}