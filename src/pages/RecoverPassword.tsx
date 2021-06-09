import { useEffect, useState } from 'react';
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
import { useAuth } from '../hooks/auth';

interface FormInputs {
  password: string;
  passwordConfirmation: string;
}

interface LocationProps {
  token: string;
}

const schema = yup.object().shape({
  password: yup.string().required('É obrigatório informar a senha'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
    .required('É obrigatório confirmar a senha'),
});

const RecoverPassword = () => {
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
  const { storeSession } = useAuth();

  const onSubmit = async (data: FormInputs) => {
    const authService = new AuthService();
    setLoading(true);

    try {
      const response = await authService.changePassword(
        location.state.token,
        data.password,
      );
      if (response.status === 200) {
        toast('Senha alterada com sucesso.', { type: 'success' });
        storeSession(response.data.token, response.data.user);
        history.push('/login');
      }
      return;
    } catch (error) {
      if (error.response.status === 401) {
        toast('Não é possível alterar sua senha.', { type: 'warning' });
      }
      toast('Ocorreu um erro por favor tente novamente.', { type: 'error' });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!location.state.token) {
      toast(
        'Não foi possível identificar sua identidade, volte uma passo atrás',
        {
          type: 'warning',
          onClick: () => history.goBack(),
        },
      );
    }
  }, [location.state, history]);

  return (
    <Flex
      height="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Heading mb="auto">Nova senha</Heading>

      <Image
        src={PasswordIcon}
        alt="Desenho de uma digital torta"
        width="40"
        height="40"
      />

      <Box mb="auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Text>Digite sua nova senha</Text>
            <Input
              type="password"
              placeholder="******"
              errorMessage={errors.password?.message}
              width="2xs"
              isInvalid={!!errors.password}
              {...register('password')}
            />
          </Box>

          <Box>
            <Text>Confirme sua nova senha</Text>
            <Input
              type="password"
              placeholder="******"
              errorMessage={errors.passwordConfirmation?.message}
              width="2xs"
              isInvalid={!!errors.passwordConfirmation}
              {...register('passwordConfirmation')}
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

export default RecoverPassword;
