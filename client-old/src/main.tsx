import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import Root from "./components/Root";

createRoot(document.getElementById("root")!).render(
  <Root>
    <App />
  </Root>
);
