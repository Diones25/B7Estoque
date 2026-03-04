import { User } from "../db/schema";

export const formatUser = (user: User) => {
  const { password, ...userWithoutPassword } = user;

  if (userWithoutPassword) {
    userWithoutPassword.avatar = `${process.env.BASE_URL}/static/avatars/${userWithoutPassword.avatar}`;
  }

  return userWithoutPassword;
}