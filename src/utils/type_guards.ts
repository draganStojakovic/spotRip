import { TokenResponse } from "../types/token_response";
import { Config, ConfigState } from "../types/config_type";

export function isPrimitiveType<
  T extends string | number | bigint | boolean | undefined | symbol | null
>(arg: unknown, type: T): arg is T {
  return typeof arg === typeof type;
}

export function isToken(arg: unknown): arg is TokenResponse {
  return (
    !!arg &&
    typeof arg === "object" &&
    "access_token" in arg &&
    typeof arg.access_token === "string" &&
    "token_type" in arg &&
    typeof arg.token_type === "string" &&
    "expires_in" in arg &&
    typeof arg.expires_in === "number"
  );
}

export function isConfig(arg: unknown): arg is Config {
  return (
    !!arg &&
    typeof arg === "object" &&
    "token" in arg &&
    isToken(arg.token) &&
    "last_refresh" in arg &&
    typeof arg.last_refresh === "number"
  );
}

export function isConfigState(arg: unknown): arg is ConfigState {
  return (
    !!arg &&
    typeof arg === "object" &&
    "state" in arg &&
    typeof arg.state === "string"
  );
}
