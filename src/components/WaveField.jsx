import { useEffect, useRef } from 'react';

const WIDTH = 640;
const HEIGHT = 400;
const LINES = 9;
const STEP = 16;
const ACCENT_LINE = 5;
const MARKER_X = 0.68;

/** Height of contour line `i` at horizontal position `u` (0–1) and time `t` (s). */
function waveY(i, u, t, swell) {
  const base = 56 + i * ((HEIGHT - 112) / (LINES - 1));
  const amplitude = 7 + i * 1.1;
  const bump = swell.strength * Math.exp(-((u - swell.x) ** 2) / 0.01) * 16;
  return (
    base +
    Math.sin(u * 6.2 + t * 0.55 + i * 0.42) * amplitude +
    Math.sin(u * 13.5 - t * 0.8 + i * 0.9) * 2.6 -
    bump
  );
}

function pathFor(i, t, swell) {
  let d = '';
  for (let x = 0; x <= WIDTH; x += STEP) {
    d += `${x === 0 ? 'M' : 'L'}${x} ${waveY(i, x / WIDTH, t, swell).toFixed(1)}`;
  }
  return d;
}

/**
 * Hero figure: bathymetric-style contour lines generated from sine waves.
 * Drifts slowly, lifts gently under the pointer, pauses off-screen and stays
 * still for people who prefer reduced motion.
 */
export function WaveField() {
  const rootRef = useRef(null);
  const pathsRef = useRef([]);
  const markerRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const swell = { x: 0.5, strength: 0, target: 0 };
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const draw = (t) => {
      pathsRef.current.forEach((path, i) => path?.setAttribute('d', pathFor(i, t, swell)));
      const markerY = waveY(ACCENT_LINE, MARKER_X, t, swell);
      markerRef.current?.setAttribute('transform', `translate(${MARKER_X * WIDTH} ${markerY.toFixed(1)})`);
    };

    const tick = (now) => {
      swell.strength += (swell.target - swell.strength) * 0.05;
      draw((now - start) / 1000);
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion.matches || !visible) {
        draw(0);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    observer.observe(root);

    const onPointerMove = (event) => {
      const rect = root.getBoundingClientRect();
      swell.x = (event.clientX - rect.left) / rect.width;
      swell.target = 1;
    };
    const onPointerLeave = () => {
      swell.target = 0;
    };

    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerleave', onPointerLeave);
    reduceMotion.addEventListener('change', play);
    play();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
      reduceMotion.removeEventListener('change', play);
    };
  }, []);

  return (
    <div className="wavefield" ref={rootRef}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        {Array.from({ length: LINES }, (_, i) => (
          <path
            key={i}
            ref={(el) => {
              pathsRef.current[i] = el;
            }}
            className={i === ACCENT_LINE ? 'wavefield__line wavefield__line--accent' : 'wavefield__line'}
            style={{ '--depth': i / (LINES - 1) }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <g ref={markerRef} className="wavefield__marker">
          <line x1="0" y1="0" x2="0" y2={HEIGHT} />
          <circle r="5" />
        </g>
      </svg>
    </div>
  );
}
