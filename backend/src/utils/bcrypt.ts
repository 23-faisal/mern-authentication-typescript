import bcrypt from "bcryptjs";

export const hashValue = async (
  value: string,
  saltRound?: number
): Promise<string> => {
  return await bcrypt.hash(value, saltRound || 10);
};

export const compareValue = async (
  value: string,
  hashedValue: string
): Promise<boolean> => {
  return await bcrypt.compare(value, hashedValue);
};
