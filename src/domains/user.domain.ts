export interface IUser {
  name: string
  email: string
  hashedPassword: string
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}
