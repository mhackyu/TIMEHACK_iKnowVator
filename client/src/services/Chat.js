export default class Chat {
  constructor(apiClient) {
    this.http = apiClient;
  }

  send(message) {
    return this.http.post('/send', message);
  }
}