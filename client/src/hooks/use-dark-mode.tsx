import { useUiContext } from "@/contexts/ui-context";

export function useDarkMode() {
  const { darkMode, toggleDarkMode } = useUiContext();
  
  return {
    darkMode,
    toggleDarkMode,
  };
}
