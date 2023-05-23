import { EventEmitter } from "stream";
import { Config } from "./types/config_type";
import ConfigManager from "./utils/config.manager";
import Args from "./utils/args.manager";
import { isConfigState, isConfig, isToken } from "./utils/type_guards";
import Token from "./utils/token.manager";
import { TokenResponse } from "./types/token_response";

export const eventEmitter = new EventEmitter();

interface Opts {
  args: Args;
  token: TokenResponse;
}

async function main(argv: Array<string>, eventEmitter: EventEmitter): Promise<void> {
  const args = new Args(argv);
  const configManager = new ConfigManager();

  const configCheck = setInterval(() => {
    if (isConfig(configManager.config) || isConfigState(configManager.config)) {
      clearInterval(configCheck);
      const token = new Token(configManager.config);
      eventEmitter.emit("fetch_metadata", { args, token: token.token });
    }
  }, 50);

  eventEmitter.on("update_config", (data: Config) => configManager.update(data));
  eventEmitter.on("fetch_metadata", (data: Opts) => console.log(data));
}

async function fetchMetadata(data: Opts): Promise<void> {
  const { args, token } = data;
}

main(process.argv, eventEmitter);
