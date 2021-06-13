import { useState } from 'react';
import { Box, Button, Flex, Spinner, Text, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { QuestionService } from '../services/questionService';

interface FormInputs {
  answer: string;
}

interface LocationState {
  questionId: string;
  question: string;
}

const schema = yup.object().shape({
  answer: yup
    .string()
    .required('Preencha este campo')
    .min(20, 'Digite no mínimo 20 caracteres'),
});

const AnswerQuestion = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const history = useHistory<LocationState>();

  const { question, questionId } = history.location.state;

  const onSubmit = async ({ answer }: FormInputs) => {
    const questionService = new QuestionService();
    setLoading(true);

    try {
      await questionService.answerQuestion({
        answer,
        questionId,
      });
      setLoading(false);

      history.push('/acknowledgment');
    } catch (error) {
      setLoading(false);
      toast(
        'Ocorreu um erro ao criar sua pergunta, por favor tente novamente',
        {
          type: 'error',
        },
      );
    }
  };

  return (
    <Flex
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Flex width="full" paddingX={5} mt={5} mb={3}>
        <Text fontSize="larger" alignSelf="flex-start" fontWeight="bold">
          Pergunta:
        </Text>
      </Flex>

      <Box alignSelf="center" paddingX={5}>
        <Text>{question}</Text>
      </Box>

      <Box mb="auto" mt={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex width="full" mt={5} mb={3}>
            <Text fontSize="larger" alignSelf="flex-start" fontWeight="bold">
              Sua resposta:
            </Text>
          </Flex>
          <Flex flexDirection="column">
            <Textarea
              placeholder="Escreva sua resposta de forma clara"
              width="80"
              height="32"
              disabled={loading}
              {...register('answer')}
            />
            {errors.answer ? (
              <Box>
                <Text color="red.400">{errors.answer.message}</Text>
              </Box>
            ) : null}

            {loading ? (
              <Flex mt="6" justifyContent="flex-end">
                <Spinner alignSelf="flex-end" color="teal" size="lg" />
              </Flex>
            ) : (
              <Flex
                mt="4"
                justifyContent="space-between"
                flexDirection="column"
              >
                <Button
                  type="submit"
                  alignSelf="flex-end"
                  size="md"
                  width="32"
                  color="white"
                  bg="teal"
                >
                  Enviar
                </Button>
              </Flex>
            )}
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default AnswerQuestion;
