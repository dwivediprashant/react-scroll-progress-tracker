import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ScrollIndicator } from "./ScrollIndicator";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScrollIndicator />
  </StrictMode>,
);
