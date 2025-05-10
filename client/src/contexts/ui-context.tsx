import React, { createContext, useContext, useState, ReactNode } from "react";

interface UiContextType {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  
  // Initialize dark mode
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  return (
    <UiContext.Provider
      value={{
        sidebarCollapsed,
        toggleSidebar,
        mobileOpen,
        setMobileOpen,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUiContext = (): UiContextType => {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error("useUiContext must be used within a UiProvider");
  }
  return context;
};
