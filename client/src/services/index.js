import ApiClient from '../lib/api';
import User from './User';

let client = new ApiClient();
let http = client.getClient();

const UserService = new User(client);

export {
  http,
  UserService,
}