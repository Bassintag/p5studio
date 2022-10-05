const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild.build({
  entryPoints: ["src/cli/index.ts"],
  bundle: true,
  platform: "node",
  outfile: "dist/cli/index.mjs",
  minify: true,
  plugins: [nodeExternalsPlugin()],
});
