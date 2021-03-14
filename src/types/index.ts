export interface User {
  _id: string;
}
export interface Video {
  _id: string;
  vid: string;
  title?: string;
}
export interface PartyListResponse {
  uid: string;
  partyName: string;
  startTime: string;
  userList: User[];
  videos: Video[];
  numUsers: number;
  _id: string;
}

export interface PartyResponse {
  _id: string;
  partyName: string;
  videos: Video[];
}

export interface messagesType {
  uid: string;
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

export interface ChatMsg {
  uid: string;
  content: string;
  time: Date;
}
