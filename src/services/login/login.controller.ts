import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../users/user.model';
import { config } from '../../common/config';

export type checkAuthorizationProps = {
  login: string;
  password: string;
};

/**
 * Generate toke for authenticated use
 * @returns Promise with token or null is returned
 */
export const userAuthorization = async ({
  login,
  password,
}: checkAuthorizationProps): Promise<{ token: string } | null> => {
  const user = await getRepository(User).findOne({ login });

  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    const secret = config.JWT_SECRET_KEY as string;

    if (isValidPassword) {
      return {
        token: jwt.sign({ login: user.login, userId: user.id }, secret),
      };
    }

    return null;
  }

  return null;
};
