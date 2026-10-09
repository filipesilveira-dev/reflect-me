// Arquivos com os dados dos usuários
import { Professional, User } from '../models/user';

export const users: (Professional | User)[] = [
  // Profissionais
  {
    id: '1',
    username: 'admin1',
    name: 'Ana Beatriz',
    password: '123',
    role: 'professional',
  },
  {
    id: '2',
    username: 'admin2',
    name: 'Rafael Martins',
    password: '123',
    role: 'professional',
  },

  // Clientes do profissional 1
  {
    id: '3',
    username: 'user1',
    name: 'Mariana Oliveira',
    password: '123',
    role: 'user',
    professionalId: '1',
  },
  {
    id: '4',
    username: 'user2',
    name: 'Lucas Almeida',
    password: '123',
    role: 'user',
    professionalId: '1',
  },
  {
    id: '6',
    username: 'user4',
    name: 'Beatriz Costa',
    password: '123',
    role: 'user',
    professionalId: '1',
  },
  {
    id: '7',
    username: 'user5',
    name: 'Gabriel Souza',
    password: '123',
    role: 'user',
    professionalId: '1',
  },
  {
    id: '8',
    username: 'Camila Ferreira',
    password: '123',
    name: 'Camila Ferreira',
    role: 'user',
    professionalId: '1',
  },

  // Clientes do profissional 2
  {
    id: '5',
    username: 'user3',
    name: 'Pedro Henrique',
    password: '123',
    role: 'user',
    professionalId: '2',
  },
  {
    id: '9',
    username: 'user6',
    name: 'Juliana Rocha',
    password: '123',
    role: 'user',
    professionalId: '2',
  },
  {
    id: '10',
    username: 'user7',
    name: 'André Carvalho',
    password: '123',
    role: 'user',
    professionalId: '2',
  },
  {
    id: '11',
    username: 'user8',
    name: 'Larissa Mendes',
    password: '123',
    role: 'user',
    professionalId: '2',
  },
  {
    id: '12',
    username: 'user9',
    name: 'Felipe Nascimento',
    password: '123',
    role: 'user',
    professionalId: '2',
  },
];

