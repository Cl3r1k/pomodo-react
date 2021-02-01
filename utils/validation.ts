import { TCredentials } from '@actions/types';

export const validateCredentials = ({
  email,
  password,
}: TCredentials): boolean =>
  email === 'Us3r@gmail.com' && password === 'p@ssw0rd';
