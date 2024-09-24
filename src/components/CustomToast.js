import React from "react";
import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      containerStyle={{ zIndex: 99999 }}
      toastOptions={{
        success: {
          style: {
            background: "#FFFFFF",
            color: "#000000",
          },
          iconTheme: {
            primary: "var(--toast-success)",
            secondary: "#FFFFFF",
          },
        },
        error: {
          style: {
            background: "var(--toast-error)",
            color: "white",
          },
        },
      }}
    />
  );
}
