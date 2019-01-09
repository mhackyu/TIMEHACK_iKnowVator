import ApiClient from '../lib/api';
import User from './User';
import Chat from './Chat';

let client = new ApiClient();
let http = client.getClient();

const UserService = new User(client);
const ChatService = new Chat(client);

export {
  http,
  UserService,
  ChatService
}