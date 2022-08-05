export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    role: UserRole
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
  }
}

export type UserRequest = {
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
};

export type PatchUserDataRequest = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserRegistrationRequest = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AdminCreateUserRequest = {
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
  password: string;
};

export type UserChangePasswordRequest = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const convertUserClassToRequest = (user: User): UserRequest => {
  return {
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  };
};

export function extracRole(role: 'STUDENT' | 'TEACHER' | 'ADMIN') {
  return UserRole[role];
}

export default User;
