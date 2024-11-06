import { useState } from "react";
import PropTypes from 'prop-types';

// неизменяемые свойства (inline) компонента
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};
const starContainerStyle = {
  display: 'flex',
};

//проверка типов props для компонента
StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  massage: PropTypes.array,
  onChangeReting: PropTypes.func,
};

////////////// компонент StarRating /////////////////
// maxRating - максимальное кол-во звезд, по умолчанию 3
// defaultRating - рейтинг по умолчанию, отображает кол-во
// закрашенный звезд при инициализации компонента
// color - цвет звезд и текста по умолчанию #fcc419
// className - по умолчанию ''
// massage - массив словестных оценок, кол-во слов-оценок
// должно соответствовать кол-ву звезд (maxRating),
// в противном случае massage будет игнорироваться
// onChangeRating - callback Fn для подъема рейтинга вверх
export default function StarRating (
  {
    maxRating = 3,
    defaultRating = 0,
    color = '#fcc419',
    size = 48,
    className = '',
    massage = [],
    onChangeReting,
  }
)
{
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  //стили для текста
  const textStyle = {
    margin: '0',
    lineHeight: '1',
    color,
    fontSize: `${size}px`,
  };

  function handleOnRating (rating)
  {
    setRating(rating);
    onChangeReting(rating);
  }

  return (
    <article className={className} style={containerStyle}>
      <div style={starContainerStyle}>
        {
          Array.from({ length: maxRating }, (_, ind) =>
            <Star
              key={ind}
              onRate={(() => handleOnRating(ind + 1))}
              onHoverIn={() => setHoverRating(ind + 1)}
              onHoverOut={() => setHoverRating(0)}
              full={hoverRating ? hoverRating >= ind + 1 : rating >= ind + 1}
              color={color}
              size={size}
            />
          )
        }
      </div>
      <p style={textStyle}>
        {
          massage.length === maxRating
            ? massage[hoverRating ? hoverRating - 1 : rating - 1]
            : hoverRating || rating || ''
        }
      </p>
    </article>
  );
}

//компонент звезды для рейтинга
function Star ({ onRate, onHoverIn, onHoverOut, full, color, size })
{
  //стили для звезды
  const starStaly = {
    display: 'block',
    width: `${size}px`,
    height: `${size}px`,
    cursor: 'pointer',
  };

  return (
    <span
      role="button"
      style={starStaly}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {
        full
          ? <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={color}
            stroke={color}
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          : <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={color}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
      }
    </span>
  );
}