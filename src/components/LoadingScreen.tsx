/**
 * Neo-Brutalist loading screen — reused by all route guards.
 * No external deps, pure CSS animation via Tailwind.
 */
export const LoadingScreen = ({ message = 'Initializing System...' }: { message?: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-6">
      {/* Spinning square — on-brand with zero border-radius */}
      <div className="w-14 h-14 border-4 border-ink border-t-primary-container animate-spin mx-auto" />
      <p className="font-black uppercase tracking-widest text-xs opacity-60">{message}</p>
    </div>
  </div>
);
