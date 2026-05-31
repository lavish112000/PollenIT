const dots = [
  '#36B365',
  '#2E9CCA',
  '#8E3DCC',
  '#F59E0B',
  '#F26419',
  '#11B5C9',
  '#F8D12F',
  '#E83378',
  '#4057C8',
];

export default function LogoMark({ className = '' }) {
  return (
    <span
      className={`grid grid-cols-3 gap-1 ${className}`}
      aria-hidden="true"
    >
      {dots.map((color, index) => (
        <span
          key={`${color}-${index}`}
          className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  );
}
