import HttpService from "./http.service";
import Args from "../utils/args.manager";

export default class SpotifyService extends HttpService {
  constructor() {
    super();
  }

  public search = async (args: Args): Promise<any> => {
    return await this.request({
      url: "/search?q=daft%20punk&type=artist",
      method: "GET",
    });
  };
}
