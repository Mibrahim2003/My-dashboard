import { useStore } from '../context/StoreContext';

/**
 * SyncToast — lightweight, raw-CSS floating notification for Supabase sync errors.
 *
 * Renders only when `syncError` is non-null. Auto-dismisses after 6s (handled
 * by StoreContext's reportSyncError timer), but also features a manual close button.
 */
export const SyncToast = () => {
  const { syncError } = useStore();

  if (!syncError) return null;

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        maxWidth: '420px',
        padding: '1rem 1.25rem',
        background: '#1A1A1A',
        color: '#FFF',
        border: '3px solid #FF3B30',
        boxShadow: '4px 4px 0px #FF3B30',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: '0.8rem',
        lineHeight: 1.5,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        animation: 'toast-slide-in 0.25s ease-out',
      }}
    >
      <span style={{ flexShrink: 0, fontSize: '1.1rem' }}>⚠</span>
      <span style={{ flex: 1, wordBreak: 'break-word' }}>{syncError}</span>
      <style>{`
        @keyframes toast-slide-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
