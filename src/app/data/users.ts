// Arquivos com os dados dos usuários
import { Professional,User } from '../models/user';

export const users: (Professional | User)[] = [
  {
    id: '1',
    username: 'admin1',
    password: '123',
    role: 'professional',
  },
    {
    id: '2',
    username: 'admin2',
    password: '123',
    role: 'professional',
  },
  {
    id: '3',
    username: 'user1',
    password: '123',
    role: 'user',
    professionalId: `1`,
  },
  {
    id: '4',
    username: 'user2',
    password: '123',
    role: 'user',
     professionalId: `1`,
  },
    {
    id: '5',
    username: 'user2',
    password: '123',
    role: 'user',
     professionalId: `2`,
  },
];