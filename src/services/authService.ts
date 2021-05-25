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
    return this.api.post('', { email, password });
  }

  public async recoverSecretQuestion(email: string) {
    return this.api.get(`recover-secret-question/${email}`);
  }

  public async sendAnswerForSecretQuestion(email: string, answer: string) {
    return this.api.post(`answer-secret-question/${email}`, {
      answer,
    });
  }

  public async changePassword(token: string, newPassword: string) {
    return this.api.post('change-password', {
      token,
      newPassword,
    });
  }
}

export { AuthService };
