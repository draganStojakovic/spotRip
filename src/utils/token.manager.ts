import HttpService from "../services/http.service";
import { TokenResponse } from "../types/token_response";
import { eventEmitter } from "../main";
import { isConfig, isConfigState } from "./type_guards";
import { Config, ConfigState } from "../types/config_type";

export default class Token extends HttpService {
  public token: TokenResponse | null = null;

  constructor(config: Config | ConfigState) {
    super();

    if (isConfig(config)) {
      if (this.isTokenValid(config)) {
        this.token = config.token;
      }
    }

    if (isConfigState(config)) {
      this.fetchToken()
        .then((data) => {
          this.token = data;
        })
        .then(() =>
          eventEmitter.emit("update_config", {
            token: this.token,
            last_refresh: Date.now(),
          })
        )
        .catch((err) => {
          console.log("Error while fetching token: ", err);
        });
    }
  }

  private isTokenValid = (config: Config): boolean => {
    const expirationTimestamp = config.last_refresh + config.token.expires_in * 1000;
    const isTokenExpired = Date.now() > expirationTimestamp;
    return !isTokenExpired;
  };

  private fetchToken = async (): Promise<TokenResponse> => {
    const data = new URLSearchParams();

    data.append("client_id", "000000000000"); // replaced sensitive information for purposes of showing
    data.append("client_secret", "000000000000");  // off this node program. 
    data.append("grant_type", "client_credentials");

    return await this.request({
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      data: data.toString(),
    });
  };
}
