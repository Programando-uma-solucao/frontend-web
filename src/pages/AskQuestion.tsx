import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FeatherIcon from '../assets/feather.svg';
import { useAuth } from '../hooks/auth';
import { QuestionService } from '../services/questionService';
import { TagsOptions } from '../common/data/tags';

interface FormInputs {
  question: string;
  acceptConciliation: string;
}

interface LocationState {
  tags: string[];
}

const schema = yup.object().shape({
  question: yup
    .string()
    .required('Preencha o campo')
    .min(30, 'Digite no mínimo 30 caracteres'),
  acceptConciliation: yup.mixed().required('Selecione uma opção'),
});

const AskQuestion = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const history = useHistory<LocationState>();
  const { user } = useAuth();

  const onSubmit = async ({ question, acceptConciliation }: FormInputs) => {
    const questionService = new QuestionService();
    setLoading(true);

    const { tags } = history.location.state;

    if (acceptConciliation) {
      tags.push(TagsOptions.conciliation, TagsOptions.conciliationUna);
    }

    try {
      await questionService.create({
        question,
        accountId: user.id,
        tags,
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

            <Box maxWidth="72" mt="4">
              <Text textAlign="center">
                Você aceitaria tentar fazer um acordo com outro interessado?{' '}
              </Text>
              <RadioGroup>
                <Flex mt={4} justifyContent="space-around">
                  <Radio value="true" {...register('acceptConciliation')}>
                    Sim
                  </Radio>
                  <Radio value="false" {...register('acceptConciliation')}>
                    Não
                  </Radio>
                </Flex>
                {errors.question ? (
                  <Box>
                    <Text color="red.400">
                      {errors?.acceptConciliation?.message}
                    </Text>
                  </Box>
                ) : null}
              </RadioGroup>
            </Box>

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
                  mt={6}
                  type="submit"
                  alignSelf="flex-end"
                  size="md"
                  width="32"
                  color="white"
                  bg="teal"
                >
                  Feito
                </Button>
              </Flex>
            )}
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default AskQuestion;
