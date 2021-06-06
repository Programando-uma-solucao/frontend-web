export interface Question {
  question: string;
  tag: string;
  color: string;
  textColor: string;
  subQuestions: Question[];
}
