export type AuthRequest = {
  username: string;
  password: string;
};
export type RegisterRequest = {
  username: string;
  fullname: string;
  role: string;
  password: string;
};
export type AuthResponse = {
  user_info: UserInfo;
  token: string;
};
export type UserInfo = {
  id: number;
  username: string;
  fullname: string;
  weight: number;
  height: number;
  activity: string;
  mealPerDay: number;
  weightLoss: string;
  avatarUrl: string;
  age: number;
  gender: string;
  roles: UserRole[];
};

export type HealthCondition = {
  bmi: number;
  result: string;
  calories: { calo: number, type: string, value: string }[];
  color: string;
}

export type UserRole = {
  id: number;
  role: {
    id: number;
    name: string;
  };
};
