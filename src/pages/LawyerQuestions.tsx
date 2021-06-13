import { useEffect, useState } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import Lottie, { Options } from 'react-lottie';

import LawyerCardQuestion from '../components/LawyerCardQuestion';
import { QuestionService } from '../services/questionService';
import { useAuth } from '../hooks/auth';
import { GetQuestionsResponse } from '../common/interfaces/GetQuestionsResponse';
import animationData from '../assets/animations/empty.json';

const options: Options = {
  animationData,
  autoplay: true,
  loop: false,
};

const LawyerQuestions = () => {
  const [questions, setQuestions] = useState<GetQuestionsResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    async function recoverQuestions() {
      try {
        const questionService = new QuestionService();

        const response = await questionService.getQuestions({
          accountId: user.id,
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
    <Flex height="100%" flexDirection="column" alignItems="center">
      {loading ? (
        <Flex marginY="auto" justifyContent="center">
          <Spinner alignSelf="flex-end" color="teal" size="lg" />
        </Flex>
      ) : null}

      {!loading && questions.length
        ? questions.map(question => (
            <LawyerCardQuestion
              key={question.id}
              id={question.id}
              tags={question.tags}
              question={question.question}
              questionerName={question.questionerName as string}
            />
          ))
        : null}

      {!loading && !questions.length ? (
        <Lottie options={options} width={250} height={250} />
      ) : null}
    </Flex>
  );
};

export default LawyerQuestions;
