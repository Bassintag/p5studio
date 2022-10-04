export enum DocumentType {
  FILE,
  FOLDER,
}

export class File {
  readonly type: DocumentType.FILE;

  constructor(readonly name: string, readonly hash: string) {
    this.type = DocumentType.FILE;
  }
}

export class Folder {
  readonly type: DocumentType.FOLDER;

  constructor(readonly name: string, readonly children: Document[] = []) {
    this.type = DocumentType.FOLDER;
  }

  upsertFile(file: File) {
    const existing = this.children.find(
      (c) => c.type === DocumentType.FILE && c.name === file.name
    );
    if (existing == null) {
      this.addChild(file);
    }
  }

  getOrCreateFolder(name: string): Folder {
    const existing = this.getFolder(name);
    if (existing) {
      return existing;
    } else {
      const newFolder = new Folder(name);
      this.addChild(newFolder);
      return newFolder;
    }
  }

  getFolder(name: string): Folder | undefined {
    const existing = this.children.find(
      (c) => c.type === DocumentType.FOLDER && c.name === name
    );
    return existing as Folder | undefined;
  }

  removeChild(name: string, type: DocumentType): boolean {
    const index = this.children.findIndex(
      (c) => c.type === type && c.name === name
    );
    if (index >= 0) {
      this.children.splice(index, 1);
      return true;
    }
    return false;
  }

  addChild(document: Document): void {
    this.children.push(document);
  }
}

export type Document = Folder | File;
