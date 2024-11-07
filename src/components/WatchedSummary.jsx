//компонент WatchedSummary

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary ({ watched })
{
  const avgImdbRating = average(watched
    .filter(movie => movie.imdbRating > 0)
    .map(movie => movie.imdbRating));

  const avgUserRating = average(watched
    .filter(movie => movie.userRating > 0)
    .map(movie => movie.userRating));

  const avgRuntime = average(watched
    .filter(movie => movie.Runtime > 0)
    .map(movie => movie.Runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(1)} min</span>
        </p>
      </div>
    </div>
  );
}