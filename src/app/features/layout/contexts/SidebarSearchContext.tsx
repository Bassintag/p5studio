import { createContext, useContext, useMemo, useState } from "react";
import { Document, DocumentType, Folder } from "../../../../common/Document";
import { useSelector } from "react-redux";
import { selectRootFolder } from "../../files/filesSlice";

export interface SidebarSearchContextProps {
  query?: string;

  setQuery: (query?: string) => void;

  filtered?: Folder;
}

export const SidebarSearchContext =
  createContext<SidebarSearchContextProps | null>(null);

export interface SidebarSearchContextProviderProps {
  children: React.ReactNode;
}

const getFilteredDocument = (doc: Document, query: string) => {
  if (doc.name.toLowerCase().includes(query)) {
    return doc;
  }
  if (doc.type === DocumentType.FILE) {
    return undefined;
  } else {
    const children = doc.children
      .map((doc) => getFilteredDocument(doc, query))
      .filter((c) => c != null) as Document[];
    if (children.length === 0) {
      return undefined;
    }
    return new Folder(doc.name, children);
  }
};

export const SidebarSearchContextProvider = ({
  children,
}: SidebarSearchContextProviderProps) => {
  const root = useSelector(selectRootFolder);
  const [query, setQuery] = useState<string | undefined>("");

  const filtered = useMemo(() => {
    if (root && query) {
      return getFilteredDocument(root, query.toLowerCase()) as Folder;
    } else {
      return root;
    }
  }, [root, query]);

  return (
    <SidebarSearchContext.Provider
      value={{
        query,
        setQuery,
        filtered,
      }}
    >
      {children}
    </SidebarSearchContext.Provider>
  );
};

export const useSidebarSearchContext = () => {
  return useContext(SidebarSearchContext) as SidebarSearchContextProps;
};
