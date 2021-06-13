import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, Image, Spinner } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import Lottie, { Options } from 'react-lottie';

import { QuestionService } from '../services/questionService';
import { useAuth } from '../hooks/auth';
import { GetQuestionsResponse } from '../common/interfaces/GetQuestionsResponse';
import UserCardQuestion from '../components/UserCardQuestion';
import MakeQuestionIcon from '../assets/make-question.svg';
import QuestionScreening from '../components/QuestionScreening';
import animationData from '../assets/animations/empty.json';

const options: Options = {
  animationData,
  autoplay: true,
  loop: false,
};

const UserQuestions = () => {
  const [questions, setQuestions] = useState<GetQuestionsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalQuestionsOpen, setModalQuestionsOpen] = useState(false);

  const { user } = useAuth();

  const recoverQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const questionService = new QuestionService();

      const response = await questionService.getQuestions({
        accountId: user.id,
        role: user.role,
      });

      setQuestions(response.data);
    } catch (error) {
      toast(
        'Ocorreu um erro ao tentar recuperar suas perguntas, tente mais tarde',
        { type: 'error' },
      );
    } finally {
      setLoading(false);
    }
  }, [user.id, user.role]);

  useEffect(() => {
    recoverQuestions();
  }, [recoverQuestions]);

  return (
    <Flex height="100%" flexDirection="column" justifyContent="center">
      <Box>
        <Button
          position="fixed"
          bottom="80px"
          right="20px"
          zIndex="modal"
          bg="teal"
          color="white"
          size="sm"
          borderRadius="full"
          width="50px"
          height="50px"
          onClick={() => setModalQuestionsOpen(true)}
        >
          <Image
            src={MakeQuestionIcon}
            alt="Fazer uma pergunta"
            width="30px"
            height="30px"
          />
        </Button>
      </Box>

      {loading ? (
        <Flex marginY="auto" justifyContent="center">
          <Spinner alignSelf="flex-end" color="teal" size="lg" />
        </Flex>
      ) : null}

      {!loading && questions.length ? (
        questions.map(question => (
          <UserCardQuestion
            key={question.id}
            id={question.id}
            tags={question.tags}
            question={question.question}
            hasResponse={!!question.hasResponse}
          />
        ))
      ) : (
        <Flex flexDirection="column">
          <Lottie options={options} width={250} height={250} />
          <Button
            mt={4}
            variant="outline"
            color="teal"
            onClick={recoverQuestions}
            width="48"
            alignSelf="center"
          >
            Recarregar
          </Button>
        </Flex>
      )}

      <QuestionScreening
        isOpen={modalQuestionsOpen}
        setOpen={setModalQuestionsOpen}
      />
    </Flex>
  );
};

export default UserQuestions;
