export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-mark">
      <svg viewBox="0 0 42 42" aria-hidden="true" className="brand-symbol">
        <path d="M7 10.5c8.3 1.3 11.7 5.3 14 11.2C14 21.2 9.3 17.8 7 10.5Z" />
        <path d="M35 10.5c-8.3 1.3-11.7 5.3-14 11.2 7-.5 11.7-3.9 14-11.2Z" />
        <path d="M12 24.4c4.7.8 7.6 3.2 9 7.1-4.8-.5-7.7-2.7-9-7.1Z" />
        <path d="M30 24.4c-4.7.8-7.6 3.2-9 7.1 4.8-.5 7.7-2.7 9-7.1Z" />
        <path d="M21 21.8v13" />
      </svg>
      <span className={compact ? "brand-copy brand-copy-compact" : "brand-copy"}>
        <span>Project</span>
        {!compact && <span>Tejasvayu</span>}
      </span>
    </span>
  );
}
