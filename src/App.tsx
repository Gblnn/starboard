import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PWAPrompt } from "./components/pwa/PWAPrompt";
import { router } from "./router";

function App() {
  return (
    <AuthProvider>
      <PWAPrompt />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
