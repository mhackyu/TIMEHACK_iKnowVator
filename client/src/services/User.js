export default class User {
  constructor(apiClient) {
    this.http = apiClient;
  }

  getUserInfo() {
    return this.http.get('/users/me');
  }
}