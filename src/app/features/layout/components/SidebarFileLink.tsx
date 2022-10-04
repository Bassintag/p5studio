import { NavLink } from "@mantine/core";
import { File } from "@common/Document";
import { AiOutlineFile } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

export interface SidebarFileLinkProps {
  file: File;
}

export const SidebarFileLink = ({ file }: SidebarFileLinkProps) => {
  const location = useLocation();

  const link = `/${file.hash}`;

  return (
    <NavLink
      component={Link}
      to={link}
      icon={<AiOutlineFile />}
      label={file.name}
      active={location.pathname === link}
    />
  );
};
