import { AxiosInstance } from 'axios';

import axiosApi from './api';

interface CreateQuestionProps {
  question: string;
  accountId: string;
  tags: string[];
}

class QuestionService {
  private api: AxiosInstance;

  constructor() {
    this.api = axiosApi;
  }

  public async create(data: CreateQuestionProps) {
    return this.api.post('question', data);
  }
}

export { QuestionService };
