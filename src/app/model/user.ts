export interface User {
  userAuthId: number;
  create: number;
  modify: number;
  email: string;
  isActivation: boolean;
  passkey: string;
  uploaded: number;
  downloaded: number;
  status: number;
  username: string;
  sex: boolean;
  gold: number;
  exp: number;
  inviterId: string;
  avatarUrl: string;
  ip: string;
  token: string;
  isSigned: boolean;
  remember: true;
}
