// Constant Care Family Services Inc. — brand loader
//
// Renders the exact uploaded mark (CCFSI_ICON_B.svg) unmodified — same
// shield outline, same hollow transparent interior, same hands-and-heart
// path data. The only animation is a heartbeat pulse on the heart itself;
// nothing else is added, no background fill, no extra shapes. Colors read
// from the CSS custom properties set up in globals.css (--primary = Harmony
// Blue, --accent = Calm Care Teal) so the loader stays in sync if the
// palette ever changes.
//
// The path data lives in packages/shared/src/brand-mark.ts so the mobile
// app's splash draws the identical mark.

import { brandMark } from "@/lib/brand-mark";

interface LoaderProps {
  size?: number; // height in px, width scales to match the icon's aspect ratio
  className?: string;
  label?: string; // visually hidden text for screen readers
}

export function Loader({ size = 96, className = "", label = "Loading" }: LoaderProps) {
  const width = Math.round(size * (brandMark.width / brandMark.height));

  return (
    <div
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <svg
        width={width}
        height={size}
        viewBox={brandMark.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d={brandMark.shield.d}
          fill="var(--primary)"
          transform={brandMark.shield.transform}
        />
        <g transform={brandMark.heart.transform}>
          <g className="cc-loader-heart">
            <path
              d={brandMark.heart.d}
              fill="var(--accent)"
            />
          </g>
        </g>
      </svg>
      <style>{`
        .cc-loader-heart {
          transform-box: fill-box;
          transform-origin: center;
          animation: cc-beat 1.15s ease-in-out infinite;
        }
        @keyframes cc-beat {
          0% { transform: scale(1); }
          14% { transform: scale(1.12); }
          28% { transform: scale(1); }
          42% { transform: scale(1.08); }
          56% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cc-loader-heart {
            animation: none;
          }
        }
      `}</style>
      <span className="sr-only">{label}</span>
    </div>
  );
}
