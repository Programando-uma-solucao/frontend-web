import { AxiosInstance } from 'axios';

import axiosApi from './api';

interface LoginProps {
  email: string;
  password: string;
}

class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axiosApi;
  }

  public async login({ email, password }: LoginProps) {
    return this.api.post('login', { email, password });
  }

  public async recoverSecretQuestion(email: string) {
    return this.api.get(`account/recover-secret-question/${email}`);
  }

  public async sendAnswerForSecretQuestion(email: string, answer: string) {
    return this.api.post('account/answer-secret-question', {
      email,
      answer,
    });
  }

  public async changePassword(token: string, password: string) {
    return this.api.put('account/change-password', {
      token,
      password,
    });
  }
}

export { AuthService };
