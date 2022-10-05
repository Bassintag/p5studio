import path from "path";
import { root } from "../const/root";

export const getResourcePath = (name: string) => {
  return path.join(root, "resources", name);
};
