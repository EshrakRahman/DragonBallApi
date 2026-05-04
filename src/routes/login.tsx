import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/routes/root.tsx";
import Auth from "@/pages/Auth";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Auth,
});
