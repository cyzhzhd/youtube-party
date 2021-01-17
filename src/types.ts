export interface User {
  _id: string;
}
export interface Video {
  _id: string;
  vid: string;
  title?: string;
}
export interface PartyListResponse {
  description: string;
  hostId: string;
  name: string;
  startTime: string;
  userList: User[];
  videos: Video[];
  __v: number;
  _id: string;
}

export interface PartyResponse {
  _id: string;
  description: string;
  videos: Video[];
  name: string;
  hostId: string;
  startTime: Date;
}

export interface CreatePartyOption {
  name: string;
  description: string;
  hostId: string;
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

export interface PartyListLoadable {
  state: string;
  contents: PartyListResponse[];
}
