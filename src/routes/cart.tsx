import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/root.tsx";
import Cart from "@/pages/Cart";

export const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: Cart,
});
