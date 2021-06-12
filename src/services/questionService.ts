import { AxiosInstance } from 'axios';

import axiosApi from './api';
import { GetQuestionsResponse } from '../common/interfaces/GetQuestionsResponse';

interface CreateQuestionProps {
  question: string;
  accountId: string;
  tags: string[];
}

interface GetQuestionsProps {
  accountId: string;
  role?: string;
}
class QuestionService {
  private api: AxiosInstance;

  constructor() {
    this.api = axiosApi;
  }

  public async create(data: CreateQuestionProps) {
    return this.api.post('question', data);
  }

  public async getQuestions({ accountId, role }: GetQuestionsProps) {
    return this.api.get<GetQuestionsResponse[]>('question', {
      headers: { accountId, role },
    });
  }
}

export { QuestionService };
