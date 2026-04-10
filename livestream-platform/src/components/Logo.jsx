/**
 * LiveScape brand logo — a play-button/signal icon that visually communicates
 * "live streaming" without being a generic text box.
 */
function Logo({ size = 'md' }) {
  const sizes = {
    sm: { box: 'h-8 w-8', icon: 'h-4 w-4' },
    md: { box: 'h-10 w-10', icon: 'h-5 w-5' },
    lg: { box: 'h-12 w-12', icon: 'h-6 w-6' },
  }

  const s = sizes[size] || sizes.md

  return (
    <div
      className={`${s.box} relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 shadow-lg shadow-cyan-500/25`}
    >
      {/* Broadcast / play-signal icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`${s.icon} text-white`}
        aria-hidden="true"
      >
        {/* Outer signal arc (left) */}
        <path
          d="M6.34 17.66A8 8 0 0 1 6.34 6.34"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
        {/* Outer signal arc (right) */}
        <path
          d="M17.66 6.34A8 8 0 0 1 17.66 17.66"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
        {/* Inner signal arc (left) */}
        <path
          d="M9.17 14.83A4 4 0 0 1 9.17 9.17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Inner signal arc (right) */}
        <path
          d="M14.83 9.17A4 4 0 0 1 14.83 14.83"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Center play triangle */}
        <path
          d="M10.5 9.5v5l4-2.5-4-2.5Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export default Logo
