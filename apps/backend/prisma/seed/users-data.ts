import { hashSync } from 'bcryptjs';

export const users = [
  {
    name: 'John',
    email: 'admin@example.com',
    password: hashSync('123456', 10),
  },
  {
    name: 'Jane',
    email: 'user@example.com',
    password: hashSync('123456', 10),
  },
];
