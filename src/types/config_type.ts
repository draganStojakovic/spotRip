import { TokenResponse } from "./token_response";

export interface Config {
  token: TokenResponse;
  last_refresh: number;
}

export interface ConfigState {
  state: "missing";
}
