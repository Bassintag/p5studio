import path from "path";
import { root } from "../const/root";
import * as fs from "fs";

export const getResource = async (name: string): Promise<string> => {
  const resourcePath = path.join(root, "..", "resources", name);
  return await fs.promises.readFile(resourcePath, "utf-8");
};
