import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

esbuild.build({
  entryPoints: ["src/cli/index.ts"],
  bundle: true,
  platform: "node",
  format: 'esm',
  outfile: "dist/cli/index.mjs",
  minify: true,
  plugins: [nodeExternalsPlugin()],
});
