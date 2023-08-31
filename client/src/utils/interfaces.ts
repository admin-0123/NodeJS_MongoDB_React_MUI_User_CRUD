export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserData {
  firstName: string,
  lastName: string,
  email: string,
  _id: string,
  date: Date,
  __v: number
}