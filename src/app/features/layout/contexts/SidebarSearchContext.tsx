import { createContext, useContext, useState } from "react";

export interface SidebarSearchContextProps {
  query?: string;

  setQuery: (query?: string) => void;
}

export const SidebarSearchContext =
  createContext<SidebarSearchContextProps | null>(null);

export interface SidebarSearchContextProviderProps {
  children: React.ReactNode;
}

export const SidebarSearchContextProvider = ({
  children,
}: SidebarSearchContextProviderProps) => {
  const [query, setQuery] = useState<string>();

  return (
    <SidebarSearchContext.Provider
      value={{
        query,
        setQuery: (query) => {
          setQuery(query?.toLowerCase());
        },
      }}
    >
      {children}
    </SidebarSearchContext.Provider>
  );
};

export const useSidebarSearchContext = () => {
  return useContext(SidebarSearchContext) as SidebarSearchContextProps;
};
