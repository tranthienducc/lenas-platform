import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-providers.jsx";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/UserProvider.jsx";
import QueryProvider from "@/providers/query-provider.jsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen.ts";
import RootLayout from "@/layout/root/RootLayout.jsx";
import ModalProvider from "@/providers/modal-provider";
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModalProvider>
        <QueryProvider>
          <UserProvider>
            <RootLayout>
              <RouterProvider router={router} />
            </RootLayout>
          </UserProvider>
        </QueryProvider>
      </ModalProvider>
    </ThemeProvider>
    <Toaster position="top-center" />
  </StrictMode>
);
