import { DocumentType, File, Folder } from "@common/Document";
import * as chokidar from "chokidar";
import path from "path";
import EventEmitter from "events";
import chalk from "chalk";
import * as crypto from "crypto";
import * as fs from "fs";
import esbuild from "esbuild";

export interface FileServerOptions {
  root?: string;
}

export class FileServer extends EventEmitter {
  private watcher?: chokidar.FSWatcher;

  readonly files: Folder;
  readonly root: string;
  private readonly sketchesData: Record<string, string>;

  constructor(
    private readonly sketchesOutDir: string,
    { root = "." }: FileServerOptions
  ) {
    super();
    this.root = path.resolve(root);
    this.files = new Folder(path.basename(root));
    this.sketchesData = {};
  }

  private getRelativePath(subPath: string): string {
    return path.relative(this.root, subPath);
  }

  private getPathParts(subPath: string): string[] {
    const relativePath = this.getRelativePath(subPath);
    return relativePath.split(path.sep);
  }

  private hash(content: string): string {
    return crypto.createHash("sha1").update(content).digest("hex");
  }

  private upsertSketch(filePath: string): File {
    const parts = this.getPathParts(filePath);
    let currentFolder = this.files;
    for (const part of parts.slice(0, -1)) {
      currentFolder = currentFolder.getOrCreateFolder(part);
    }
    const file = new File(
      path.basename(filePath, ".sketch.ts"),
      this.hash(filePath)
    );
    currentFolder.upsertFile(file);
    this.emit("change", this.files);
    return file;
  }

  private removeSketch(filePath: string) {
    const parts = this.getPathParts(filePath);
    let currentFolder = this.files;
    let lastEmptyParent: Folder | undefined;
    let lastEmptyName: string | undefined;
    for (const part of parts.slice(0, -1)) {
      const sub = currentFolder.getFolder(part);
      if (sub == null) {
        throw new Error("Invalid path");
      }
      if (sub.children.length === 1) {
        if (lastEmptyName == null) {
          lastEmptyParent = currentFolder;
          lastEmptyName = part;
        }
      } else {
        lastEmptyName = undefined;
      }
      currentFolder = sub;
    }
    const removed = currentFolder.removeChild(
      path.basename(filePath, ".sketch.ts"),
      DocumentType.FILE
    );
    if (removed) {
      if (lastEmptyName && lastEmptyParent) {
        lastEmptyParent.removeChild(lastEmptyName, DocumentType.FOLDER);
      }
      this.emit("change", this.files);
    }
  }

  async compileSketch(filePath: string, file?: File) {
    const content = await fs.promises.readFile(filePath, "utf-8");
    const hash = this.hash(content);
    let pathHash: string;
    if (file) {
      pathHash = file.hash;
    } else {
      pathHash = this.hash(filePath);
    }
    const existing = this.sketchesData[pathHash];
    if (existing == null || hash !== existing) {
      const outfile = path.join(this.sketchesOutDir, `${pathHash}.js`);
      console.log(
        chalk.yellow("Compiling:"),
        chalk.gray(filePath),
        chalk.yellow("to"),
        chalk.gray(outfile)
      );
      await esbuild.build({
        entryPoints: [filePath],
        outfile,
        minify: true,
      });
      this.emit("fileChange", pathHash);
    }
  }

  start(): void {
    const watchPath = path.join(this.root, "**/*.sketch.ts");
    console.log(
      chalk.green("Watching files using glob:"),
      chalk.gray(watchPath)
    );
    this.watcher = chokidar.watch(watchPath, {
      ignoreInitial: false,
      usePolling: false,
      ignored: /node_modules/,
    });
    this.watcher.on("add", async (path) => {
      const file = this.upsertSketch(path);
      await this.compileSketch(path, file);
    });
    this.watcher.on("change", async (path) => {
      await this.compileSketch(path);
    });
    this.watcher.on("unlink", (path) => {
      this.removeSketch(path);
    });
  }

  async stop(): Promise<void> {
    if (this.watcher) {
      await this.watcher.close();
    }
  }
}
