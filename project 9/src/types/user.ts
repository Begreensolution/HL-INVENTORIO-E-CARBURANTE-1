export type UserRole = 'driver' | 'admin';

export interface User {
  role: UserRole;
  name: string;
}