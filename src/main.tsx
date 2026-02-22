import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        className: "toast-container",
        duration: 3000,
      }}
      richColors={true}
      expand={true}
      theme="dark"
      duration={3000}
      visibleToasts={1}
      swipeDirections={["left", "right"]}
    />
  </BrowserRouter>,
);
