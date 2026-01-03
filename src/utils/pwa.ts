// Register service worker for PWA functionality
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('ServiceWorker registered:', registration);
          
          // Check for updates when app becomes visible
          document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
              registration.update();
            }
          });
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Check every minute

          // Listen for waiting service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker is ready to take over
                  // Dispatch custom event to show update notification
                  window.dispatchEvent(new CustomEvent('pwa-update-available', {
                    detail: { registration }
                  }));
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('ServiceWorker registration failed:', error);
        });

      // Listen for controller change (when new SW takes over)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Reload the page to load new version
        window.location.reload();
      });
    });
  }
};

// Update the app to use new service worker
export const updateApp = () => {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
  }
};

// Prompt user to install PWA
export const promptInstallPWA = () => {
  let deferredPrompt: any = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install button/prompt to user
    console.log('PWA install prompt available');
    
    // You can dispatch a custom event here to show your own install UI
    window.dispatchEvent(new CustomEvent('pwa-install-available'));
  });

  // Return a function to trigger the install prompt
  return () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult:any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    }
  };
};
