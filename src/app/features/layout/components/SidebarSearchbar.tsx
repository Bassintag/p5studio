import { TextInput } from "@mantine/core";
import { useSidebarSearchContext } from "../contexts/SidebarSearchContext";
import { AiOutlineSearch } from "react-icons/ai";

export const SidebarSearchbar = () => {
  const { query, setQuery } = useSidebarSearchContext();

  return (
    <TextInput
      size="xs"
      icon={<AiOutlineSearch />}
      placeholder="Search"
      variant="filled"
      mb={4}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
