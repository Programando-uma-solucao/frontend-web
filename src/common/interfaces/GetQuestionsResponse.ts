export interface GetQuestionsResponse {
  _id: string;
  tags: string[];
  question: string;
  questionerName?: string;
  hasResponse?: boolean;
}
