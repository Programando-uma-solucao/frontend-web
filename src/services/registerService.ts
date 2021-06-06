import { AxiosInstance } from 'axios';

import axiosApi from './api';

interface RegisterProps {
  name: string;
  email: string;
  phone: string;
  sex: string;
  cpf: string;
  password: string;
  address: string;
  role: string;
  oab?: string;
  tags?: string[];
  secretQuestion: string;
  secretAnswer: string;
}

interface Token {
  token: string;
}

class RegisterService {
  private api: AxiosInstance;

  constructor() {
    this.api = axiosApi;
  }

  public async register(data: RegisterProps) {
    return this.api.post<Token>('account', data);
  }
}

export { RegisterService };
