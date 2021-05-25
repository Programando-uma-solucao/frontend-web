import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router-dom';

import Input from '../components/Input';
import { AuthService } from '../services/authService';
import PasswordIcon from '../assets/password.png';

interface FormInputs {
  answer: string;
}

interface LocationProps {
  secretQuestion: string;
  email: string;
}

const schema = yup.object().shape({
  answer: yup.string().required('Resposta da pergunta é obrigatória'),
});

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const history = useHistory();
  const location = useLocation<LocationProps>();

  const onSubmit = async (data: FormInputs) => {
    const authService = new AuthService();
    setLoading(true);

    try {
      const response = await authService.sendAnswerForSecretQuestion(
        location.state.email,
        data.answer,
      );
      if (response.status === 200) {
        toast('Resposta correta.', { type: 'success' });
        history.push('/recover-password', {
          token: response.data.token,
        });
      }
      return;
    } catch (error) {
      if (error.response.status === 401) {
        toast('Resposta errada.', { type: 'warning' });
      }
      toast('Ocorreu um erro por favor tente novamente.', { type: 'error' });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!location.state.email) {
      toast('Não foi possível recuperar seu email, volte uma passo atrás', {
        type: 'warning',
        onClick: () => history.goBack(),
      });
    }
  }, [location.state, history]);

  return (
    <Flex
      height="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Heading mb="auto">Pergunta secreta</Heading>

      <Image
        src={PasswordIcon}
        alt="Desenho de uma digital torta"
        width="40"
        height="40"
      />

      <Box mb="auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Text>{location.state.secretQuestion}</Text>
            <Input
              type="text"
              placeholder="Sua resposta aqui..."
              errorMessage={errors.answer?.message}
              width="2xs"
              isInvalid={!!errors.answer}
              {...register('answer')}
            />
          </Box>

          {loading ? (
            <Flex mt="6">
              <Spinner
                color="teal"
                size="lg"
                marginLeft="auto"
                marginRight="auto"
              />
            </Flex>
          ) : (
            <Button
              type="submit"
              bg="teal"
              color="white"
              width="2xs"
              size="lg"
              mt={6}
            >
              Enviar
            </Button>
          )}
        </form>
      </Box>
    </Flex>
  );
};

export default ForgetPassword;
