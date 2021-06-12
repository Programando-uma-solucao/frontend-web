export interface GetQuestionsResponse {
  id: string;
  tags: string[];
  question: string;
  questionerName?: string;
  hasResponse?: boolean;
}
