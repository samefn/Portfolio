import { Children, useCallback, useEffect, useRef, useState } from 'react';

const slidePos = (viewport, slide) =>
  slide.offsetLeft - (parseFloat(getComputedStyle(viewport).paddingLeft) || 0);

export default function Carousel({ children, label, className = '', mobileOnly = false }) {
  const viewportRef = useRef(null);
  const items = Children.toArray(children);
  const [state, setState] = useState({ atStart: true, atEnd: false, active: 0, positions: [0] });

  const update = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const slides = [...el.querySelectorAll(':scope > .carousel-track > .carousel-slide')];
    if (!slides.length) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const positions = [];
    slides.forEach((sl) => {
      const p = Math.min(Math.max(slidePos(el, sl), 0), max);
      if (!positions.some((q) => Math.abs(q - p) < 4)) positions.push(p);
    });
    let active = 0;
    positions.forEach((p, i) => {
      if (Math.abs(p - el.scrollLeft) < Math.abs(positions[active] - el.scrollLeft)) active = i;
    });
    setState({ atStart: el.scrollLeft <= 4, atEnd: el.scrollLeft >= max - 4, active, positions });
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update, items.length]);

  const goTo = (index) => {
    const el = viewportRef.current;
    const left = state.positions[index];
    if (el && left !== undefined) el.scrollTo({ left, behavior: 'smooth' });
  };

  const step = (dir) => {
    goTo(Math.min(Math.max(state.active + dir, 0), state.positions.length - 1));
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  };

  const noScroll = state.atStart && state.atEnd;

  return (
    <div
      className={`carousel ${mobileOnly ? 'carousel-mobile-only' : ''} ${noScroll ? 'is-static' : ''} ${className}`}
      role="region"
      aria-roledescription="carrusel"
      aria-label={label}
      data-reveal
    >
      <button
        type="button"
        className="carousel-arrow carousel-prev"
        onClick={() => step(-1)}
        disabled={state.atStart}
        aria-label="Anterior"
      >
        <i className="bi bi-chevron-left" aria-hidden="true" />
      </button>

      <div className="carousel-viewport" ref={viewportRef} tabIndex={0} onKeyDown={onKeyDown}>
        <ul className="carousel-track">
          {items.map((child, i) => (
            <li
              key={child.key ?? i}
              className="carousel-slide"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${items.length}`}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="carousel-arrow carousel-next"
        onClick={() => step(1)}
        disabled={state.atEnd}
        aria-label="Siguiente"
      >
        <i className="bi bi-chevron-right" aria-hidden="true" />
      </button>

      {state.positions.length > 1 && (
        <div className="carousel-dots" role="group" aria-label="Ir a la tarjeta">
          {state.positions.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === state.active ? 'is-active' : ''}
              aria-label={`Ir a la posición ${i + 1} de ${state.positions.length}`}
              aria-current={i === state.active ? 'true' : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
