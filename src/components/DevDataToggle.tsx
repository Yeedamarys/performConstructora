/**
 * Dev-only data switch for stress-testing the project cards (break-ui). Not part of the design:
 * plain system chrome, bottom-centre. The choice lives in ?data= so a reload keeps it; the data is
 * chosen when src/data/projects.ts loads, so switching reloads the page.
 */
const MODES = [
  ['demo', 'Demo data'],
  ['worst', 'Worst case'],
  ['empty', 'Empty'],
  ['one', 'One'],
  ['many', '64 rows'],
] as const;

export default function DevDataToggle() {
  const current = new URLSearchParams(window.location.search).get('data') ?? 'demo';
  const choose = (mode: string) => {
    const url = new URL(window.location.href);
    if (mode === 'demo') url.searchParams.delete('data');
    else url.searchParams.set('data', mode);
    window.location.assign(url);
  };
  return (
    <div
      role="group"
      aria-label="Datos de prueba (solo desarrollo)"
      style={{
        position: 'fixed',
        left: '50%',
        bottom: 16,
        transform: 'translateX(-50%)',
        zIndex: 2147483000,
        display: 'flex',
        gap: 2,
        padding: 3,
        borderRadius: 999,
        background: '#e5e7eb',
        boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
        font: '500 12px/1 system-ui, sans-serif',
      }}
    >
      {MODES.map(([mode, label]) => (
        <button
          key={mode}
          type="button"
          aria-pressed={current === mode}
          onClick={() => choose(mode)}
          style={{
            border: 0,
            borderRadius: 999,
            padding: '7px 12px',
            cursor: 'pointer',
            background: current === mode ? '#fff' : 'transparent',
            color: '#111',
            boxShadow: current === mode ? '0 1px 2px rgba(0,0,0,0.15)' : 'none',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
