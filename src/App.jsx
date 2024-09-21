import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
const router = createRouter({ routeTree });

function App() {
  return (
    <main className="container relative w-full h-screen max-w-full">
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
