import { NavLink } from "@mantine/core";
import { Folder } from "@common/Document";
import {
  AiFillFolder,
  AiFillFolderOpen,
  AiOutlineFolder,
  AiOutlineFolderOpen,
} from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import { SidebarLink } from "./SidebarLink";
import { useMemo } from "react";
import { useSidebarSearchContext } from "../contexts/SidebarSearchContext";

export interface SidebarFolderLinkProps {
  folder: Folder;
}

export const SidebarFolderLink = ({ folder }: SidebarFolderLinkProps) => {
  const [isOpen, { toggle }] = useDisclosure(false);

  const icon = useMemo(() => {
    if (folder.children.length === 0) {
      return isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />;
    } else {
      return isOpen ? <AiFillFolderOpen /> : <AiFillFolder />;
    }
  }, [isOpen, folder]);

  return (
    <>
      <NavLink
        icon={icon}
        onClick={toggle}
        label={folder.name}
        active={isOpen}
        variant="subtle"
      />
      {isOpen && (
        <div style={{ marginLeft: 8 }}>
          {folder.children.map((d) => (
            <SidebarLink key={`${d.type}-${d.name}`} document={d} />
          ))}
        </div>
      )}
    </>
  );
};
