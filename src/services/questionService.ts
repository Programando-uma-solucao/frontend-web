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
}
class QuestionService {
  private api: AxiosInstance;

  constructor() {
    this.api = axiosApi;
  }

  public async create(data: CreateQuestionProps) {
    return this.api.post('question', data);
  }

  public async getQuestions({ accountId }: GetQuestionsProps) {
    return this.api.get<GetQuestionsResponse[]>(
      `question?accountId=${accountId}`,
    );
  }
}

export { QuestionService };
