import { Document, DocumentType } from "@common/Document";
import { SidebarFileLink } from "./SidebarFileLink";
import { SidebarFolderLink } from "./SidebarFolderLink";

export interface SidebarLinkProps {
  document: Document;
}

export const SidebarLink = ({ document }: SidebarLinkProps) => {
  switch (document.type) {
    case DocumentType.FILE:
      return <SidebarFileLink file={document} />;
    case DocumentType.FOLDER:
      return <SidebarFolderLink folder={document} />;
  }
};
