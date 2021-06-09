import { useState } from 'react';
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
import { useHistory } from 'react-router-dom';

import Input from '../components/Input';
import { AuthService } from '../services/authService';
import PasswordIcon from '../assets/password.png';

interface FormInputs {
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('Obrigatório informar este campo'),
});

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmit = async (data: FormInputs) => {
    const authService = new AuthService();
    setLoading(true);

    try {
      const response = await authService.recoverSecretQuestion(data.email);
      if (response.status === 200 && response.data.question) {
        setLoading(false);
        history.push('/secret-question', {
          secretQuestion: response.data.question,
          email: getValues().email,
        });
        return;
      }
    } catch (error) {
      if (error.response.data.status === 404) {
        toast('Este e-mail não existe', { type: 'warning' });
      }

      toast('Ocorreu um erro, por favor tente novamente', { type: 'error' });
    }

    setLoading(false);
  };

  return (
    <Flex
      height="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Heading mb="auto">Recuperando senha</Heading>

      <Image
        src={PasswordIcon}
        alt="Desenho de uma digital torta"
        width="40"
        height="40"
      />

      <Box mb="auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Text>Digite seu e-mail:</Text>
            <Input
              type="email"
              placeholder="exemplo@email.com"
              errorMessage={errors.email?.message}
              width="2xs"
              isInvalid={!!errors.email}
              {...register('email')}
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
