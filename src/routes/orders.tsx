import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/root.tsx";
import Orders from "@/pages/Orders";

export const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: Orders,
});
