import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import FeatherIcon from '../assets/feather.svg';
import { useAuth } from '../hooks/auth';
import { QuestionService } from '../services/questionService';

interface FormInputs {
  question: string;
}

interface LocationState {
  tags: string[];
}

const AskQuestion = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const history = useHistory<LocationState>();
  const { user } = useAuth();

  const onSubmit = async ({ question }: FormInputs) => {
    const questionService = new QuestionService();
    setLoading(true);

    try {
      await questionService.create({
        question,
        accountId: user.id,
        tags: history.location.state.tags,
      });
      setLoading(false);

      toast('Pergunta criada com sucesso! Aguarde a resposta de um advogado.', {
        type: 'success',
      });

      history.push('/questions');
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
      <Flex mt="auto" mb={5}>
        <Image marginRight={2} src={FeatherIcon} alt="Pena de escrever" />
        <Text fontSize="larger">Qual a sua pergunta ?</Text>
      </Flex>

      <Box mb="auto" mt={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column">
            <Textarea
              placeholder="Escreva sua pergunta com a maior quantidade de detalhes possível"
              width="72"
              height="32"
              disabled={loading}
              {...register('question')}
            />
            {errors.question ? (
              <Box>
                <Text color="red.400">{errors.question.message}</Text>
              </Box>
            ) : null}

            {loading ? (
              <Flex mt="6" justifyContent="flex-end">
                <Spinner alignSelf="flex-end" color="teal" size="lg" />
              </Flex>
            ) : (
              <Button
                type="submit"
                mt={4}
                alignSelf="flex-end"
                size="md"
                width="32"
                color="white"
                bg="teal"
              >
                Feito
              </Button>
            )}
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default AskQuestion;
