import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PWAPrompt } from "./components/pwa/PWAPrompt";
import { router } from "./router";

function App() {
  return (
    <div className="min-h-screen bg-background pt-safe">
      <AuthProvider>
        <PWAPrompt />
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
