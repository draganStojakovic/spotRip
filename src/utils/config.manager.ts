import fs from "fs/promises";
import fsync from "fs";
import path from "path";
import { Config, ConfigState } from "../types/config_type";

export default class ConfigManager {
  private path: Readonly<string> = path.join(__dirname, "..", "spotrip.json");
  public config: Config | ConfigState | null = null;

  constructor() {
    if (this.checkIfConfigExists(this.path)) {
      this.readConfig(this.path)
        .then((data) => {
          this.config = data;
        })
        .catch((err) => console.error(`Config reading error: ${err}`));
    } else {
      this.config = { state: "missing" };
    }
  }

  public update = (data: Config) =>
    fsync.writeFile(this.path, JSON.stringify(data, null, 2), (err) => {
      if (err) return console.error(`Error updating config: ${err}`);
      console.log("Config updated successfully.");
    });

  private checkIfConfigExists(file: string): boolean {
    return fsync.existsSync(file);
  }

  private async readConfig(filePath: string): Promise<Config> {
    try {
      const data = await fs.readFile(filePath, "utf8");

      return JSON.parse(data) as Config;
    } catch (err) {
      throw new Error(String(err));
    }
  }
}
