import { Navbar } from "@mantine/core";
import { SidebarLink } from "./SidebarLink";
import { SidebarSearchContextProvider } from "../contexts/SidebarSearchContext";
import { SidebarSearchbar } from "./SidebarSearchbar";

export const SidebarFilesSection = () => {
  return (
    <Navbar.Section grow>
      <SidebarSearchContextProvider>
        <SidebarSearchbar />
        <SidebarLink />
      </SidebarSearchContextProvider>
    </Navbar.Section>
  );
};
