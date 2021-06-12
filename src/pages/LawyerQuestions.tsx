import { useEffect, useState } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import { toast } from 'react-toastify';

import LawyerCardQuestion from '../components/LawyerCardQuestion';
import { QuestionService } from '../services/questionService';
import { useAuth } from '../hooks/auth';
import { GetQuestionsResponse } from '../common/interfaces/GetQuestionResponse';

const LawyerQuestions = () => {
  const [questions, setQuestions] = useState<GetQuestionsResponse[]>();
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    async function recoverQuestions() {
      try {
        const questionService = new QuestionService();

        const response = await questionService.getQuestions({
          accountId: user.id,
          role: user.role,
        });

        setQuestions(response.data);
      } catch (error) {
        toast(
          'Ocorreu um erro ao tentar recuperar as perguntas, tente mais tarde',
          { type: 'error' },
        );
      } finally {
        setLoading(false);
      }
    }

    recoverQuestions();
  }, [user.id, user.role]);

  return (
    <Flex height="100%" flexDirection="column" justifyContent="center">
      {!loading && questions ? (
        questions.map(question => (
          <LawyerCardQuestion
            key={question.id}
            id={question.id}
            tags={question.tags}
            question={question.question}
            questionerName={question.questionerName as string}
          />
        ))
      ) : (
        <Flex marginY="auto" justifyContent="center">
          <Spinner alignSelf="flex-end" color="teal" size="lg" />
        </Flex>
      )}
    </Flex>
  );
};

export default LawyerQuestions;
