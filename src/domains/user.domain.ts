export interface IUser {
  name: string
  email: string
  hashedPassword: string
  role: Role
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
