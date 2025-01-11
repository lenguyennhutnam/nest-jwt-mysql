// eslint-disable-next-line @typescript-eslint/no-require-imports
const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = async (plainValue: string) => {
  try {
    const res = bcrypt.hashSync(plainValue, saltRounds);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const comparePassword = async (
  plainValue: string,
  hashValue: string,
) => {
  return bcrypt.compareSync(plainValue, hashValue);
};
