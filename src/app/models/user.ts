// Interface de para os usuários (define o formato)
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'user';
  professionalId: string;
}

export interface Professional {
  id: string;
  username: string;
  password: string;
  role: 'professional';
}
