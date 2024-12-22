export type AuthRequest = {
  username: string;
  password: string;
};
export type AuthResponse = {
  userInfo: UserInfo;
  token: string;
};
export type UserInfo = {
  id: number;
  username: string;
  fullname: string;
  weight: number | null;
  height: number | null;
  activity: string;
  mealPerDay: number | null;
  weightLoss: string | null;
  avatarUrl: string;
  age: number | null;
  gender: string | null;
};
