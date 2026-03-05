import bcrypt from "bcrypt";

export const verifyPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
}