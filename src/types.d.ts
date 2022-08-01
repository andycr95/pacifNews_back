export interface User {
  id: number;
  name: string
  email: string
  password: string
  phoneNumber: string
}

export interface IEnv {
  port: number;
  db:{
      name: string;
      user: string;
      pw: string;
      account: string;
  };
  apiPath: string;
  staticPath: string;
}

export type NewUserEntry = Omit<User, 'id'>
export type LoginUserEntry = Omit<User, 'id' | 'name' | 'phoneNumber'>
