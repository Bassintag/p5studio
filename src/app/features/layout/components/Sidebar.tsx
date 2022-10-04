import { createStyles, Navbar } from "@mantine/core";
import { SidebarFilesSection } from "./SidebarFilesSection";

const useStyle = createStyles((theme) => ({
  navbar: {
    background: theme.colors.gray[0],
  },
}));

export const Sidebar = () => {
  const { classes } = useStyle();

  return (
    <Navbar className={classes.navbar} p="xs" width={{ base: 400 }}>
      <SidebarFilesSection />
    </Navbar>
  );
};
