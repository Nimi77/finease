import { useOutletContext } from "react-router-dom";

interface DashboardLayoutContext {
  searchQuery: string;
}

export function useDashboardLayoutContext() {
  return useOutletContext<DashboardLayoutContext>();
}
