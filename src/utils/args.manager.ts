import { isPrimitiveType } from "./type_guards";

export default class Args {
  public artist: string | null = null;
  public album: string | null = null;
  public track: string | null = null;

  constructor(argv: Array<string>) {
    const argArray = argv.slice(2);

    for (let i = 0; i < argArray.length; i++) {
      switch (argArray[i]) {
        case "--artist":
          this.setArgValue(argArray, i, "artist");
          break;
        case "--album":
          this.setArgValue(argArray, i, "album");
          break;
        case "--track":
          this.setArgValue(argArray, i, "track");
          break;
      }
    }

    if (!this.checkArgs()) {
      console.error(
        "\nProvide at least one of the following: album, artist, track."
      );
      process.exit();
    }
  }

  private setArgValue(argArray: string[], index: number, prop: keyof Args): void {
    if (isPrimitiveType(argArray[index + 1], "string")) {
      const value = argArray[index + 1];
      if (this.checkLength(value) && !value.startsWith("--")) {
        this[prop] = value;
      }
    }
  }

  private checkArgs(): boolean {
    if (
      isPrimitiveType(this.artist, "string") ||
      isPrimitiveType(this.album, "string") ||
      isPrimitiveType(this.track, "string")
    ) {
      return true;
    }
    return false;
  }

  private checkLength(arg: string): boolean {
    return arg.length !== 0;
  }
}
