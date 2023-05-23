import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class HttpService {
  protected httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://api.spotify.com/v1",
      withCredentials: true,
      headers: {
        XMLHttpRequest: "HMLHttpRequest",
      },
    });
  }

  protected request = <T, R = T>(requestConfig: AxiosRequestConfig): Promise<R> =>
    this.httpClient.request(requestConfig).then(({ data }) => data);
}
