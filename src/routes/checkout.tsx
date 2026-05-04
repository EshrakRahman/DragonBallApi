import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/root.tsx";
import Checkout from "@/pages/Checkout";

export const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: Checkout,
});
