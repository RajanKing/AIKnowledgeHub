import { useUiContext } from "@/contexts/ui-context";

export function useSidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileOpen, setMobileOpen } = useUiContext();
  
  return {
    collapsed: sidebarCollapsed,
    toggleSidebar,
    mobileOpen,
    setMobileOpen,
  };
}
