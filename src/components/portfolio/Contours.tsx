export function Contours({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 800"
      className={`tp-contours ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M-60 220 C 180 120, 420 320, 700 200 S 1180 60, 1300 180" />
        <path d="M-60 260 C 180 160, 420 360, 700 240 S 1180 100, 1300 220" />
        <path d="M-60 300 C 180 200, 420 400, 700 280 S 1180 140, 1300 260" />
        <path d="M-60 340 C 180 240, 420 440, 700 320 S 1180 180, 1300 300" />
        <path d="M-60 380 C 180 280, 420 480, 700 360 S 1180 220, 1300 340" />
        <path d="M-60 560 C 220 660, 520 460, 780 600 S 1160 700, 1300 600" />
        <path d="M-60 600 C 220 700, 520 500, 780 640 S 1160 740, 1300 640" />
        <path d="M-60 640 C 220 740, 520 540, 780 680 S 1160 780, 1300 680" />
      </g>
    </svg>
  );
}
