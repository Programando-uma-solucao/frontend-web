import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex, Image, Spinner, Text } from '@chakra-ui/react';
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
  }, [user.id]);

  useEffect(() => {
    recoverQuestions();
  }, [recoverQuestions]);

  return (
    <Flex height="100%" flexDirection="column" alignItems="center">
      <Flex width="full" paddingLeft="20px" mt={3}>
        <Text fontSize="xl" textAlign="start">
          Suas perguntas:
        </Text>
      </Flex>
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
          style={{ boxShadow: '0px 0px 10px gray' }}
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
      {!loading && questions.length
        ? questions.map(question => (
            <UserCardQuestion
              key={question._id}
              id={question._id}
              tags={question.tags}
              question={question.question}
              hasResponse={!!question.hasResponse}
            />
          ))
        : null}

      {!loading && !questions.length ? (
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
      ) : null}
      <QuestionScreening
        isOpen={modalQuestionsOpen}
        setOpen={setModalQuestionsOpen}
      />
    </Flex>
  );
};

export default UserQuestions;
