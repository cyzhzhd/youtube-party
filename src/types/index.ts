export interface User {
  _id: string;
}
export interface Video {
  _id: string;
  vid: string;
  title?: string;
}
export interface PartyListResponse {
  hostId: string;
  partyName: string;
  startTime: string;
  userList: User[];
  videos: Video[];
  numUsers: number;
  bookmarked: number;
  _id: string;
}

export interface PartyResponse {
  _id: string;
  partyName: string;
  videos: Video[];
}

export interface ChatMsg {
  uid: string;
  nickName: string;
  content: string;
  time: Date;
}
export interface messagesType {
  uid: string;
  nickName: string;
  content: string;
}
export interface QueueItem {
  type: string;
  uid: string;
  content: string;
  add: boolean;
  partyId: string;
  time: number;
  videoId: string;
}

export interface VideoInfo {
  videoId: string;
  time: number;
}

export interface UserData {
  _id?: string;
  uid?: string;
  sessionId?: string;
  status?: string;
  nickName?: string;
  friendList?: FriendList[];
  bookmarkedParties?: PartyListResponse[];
  notificationHistory?: NotificationHistory[];
  joinedTime?: number;
}

export interface FriendList {
  _id: string;
  uid: string;
  nickName: string;
  status: string;
  partyName: string;
}

export interface Suggest {
  id: string;
  name: string;
}

export interface localStorageData {
  updateTime: Date;
  id: string;
  type: string;
}
export interface NotificationHistory {
  _id?: string;
  type: string;
  from: string;
  to: string;
  content?: string;
  time: Date;
  checked: boolean;
}

export enum notificationType {
  FRIEND_REQUEST = 'friendRequest',
}
