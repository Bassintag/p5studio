import { Navbar } from "@mantine/core";
import { SidebarLink } from "./SidebarLink";
import { useAppSelector } from "../../../store";
import { selectRootFolder } from "../../files/filesSlice";
import { SidebarSearchContextProvider } from "../contexts/SidebarSearchContext";
import { SidebarSearchbar } from "./SidebarSearchbar";

export const SidebarFilesSection = () => {
  const rootFolder = useAppSelector(selectRootFolder);

  return (
    <Navbar.Section grow>
      <SidebarSearchContextProvider>
        <SidebarSearchbar />
        {rootFolder && <SidebarLink document={rootFolder} />}
      </SidebarSearchContextProvider>
    </Navbar.Section>
  );
};
