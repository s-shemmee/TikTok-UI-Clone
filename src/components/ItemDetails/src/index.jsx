import React from "react";
import ReactDOMClient from "react-dom/client";
import { ItemDetailsScreen } from "./screens/ItemDetailsScreen";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<ItemDetailsScreen />);
