import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { RefreshCw, X } from 'lucide-react';
import { updateApp } from '../utils/pwa';

export const UpdateNotification = () => {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setShowUpdate(true);
    };

    window.addEventListener('pwa-update-available', handleUpdate);

    return () => {
      window.removeEventListener('pwa-update-available', handleUpdate);
    };
  }, []);

  const handleUpdate = () => {
    updateApp();
    // The page will reload automatically after the new SW takes over
  };

  const handleDismiss = () => {
    setShowUpdate(false);
  };

  if (!showUpdate) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in">
      <div className="bg-gradient-to-r from-[#191970] to-[crimson] text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 max-w-md">
        <RefreshCw className="w-5 h-5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-sm">Update Available</p>
          <p className="text-xs opacity-90">A new version of StarBoard is ready</p>
        </div>
        <Button
          onClick={handleUpdate}
          size="sm"
          className="bg-white text-[#191970] hover:bg-gray-100 font-semibold"
        >
          Update
        </Button>
        <button
          onClick={handleDismiss}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
