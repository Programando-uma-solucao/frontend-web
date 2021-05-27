import { useState } from 'react';
import { Button, Flex, Heading, Image, Spinner } from '@chakra-ui/react';
import {
  CheckIcon,
  ViewIcon,
  ViewOffIcon,
  WarningIcon,
} from '@chakra-ui/icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Input from '../components/Input';
import { useAuth } from '../hooks/auth';
import Logo from '../assets/icon.svg';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { login } = useAuth();
  const history = useHistory();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setLoading(true);

    try {
      await login({
        email: data.email,
        password: data.password,
      });

      setLoading(false);
      toast(
        <Flex alignItems="center" justifyContent="space-around">
          {' '}
          <CheckIcon /> Login realizado com sucesso!
        </Flex>,
        { type: 'success' },
      );
      history.push('/home');
    } catch (error) {
      toast(
        <Flex alignItems="center" justifyContent="space-around">
          {' '}
          <WarningIcon /> Ocorreu um erro ao realizar seu login!
        </Flex>,
        { type: 'error' },
      );
      setLoading(false);
    }
  };

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      padding="14"
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        bg="gray.100"
        minWidth="max"
        p={12}
        pb={6}
        rounded={6}
      >
        <Image
          src={Logo}
          alt="Logotipo da plataforma, uma  mão oferecendo uma balança"
          boxSize="80px"
          objectFit="cover"
        />
        <Heading marginY={4} marginRight="auto">
          Acessar
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="exemplo@email.com"
            type="email"
            variant="outline"
            isInvalid={!!errors.email}
            errorMessage="O email é obrigatório"
            {...register('email', { required: true })}
          />

          <Input
            placeholder="********"
            type={passwordVisible ? 'text' : 'password'}
            rightElement={passwordVisible ? ViewOffIcon : ViewIcon}
            rightElementClick={() => setPasswordVisible(state => !state)}
            variant="outline"
            isInvalid={!!errors.password}
            errorMessage="A senha é obrigatória"
            {...register('password', { required: true })}
          />

          {loading ? (
            <Flex marginY="3">
              <Spinner
                color="teal"
                size="lg"
                marginLeft="auto"
                marginRight="auto"
              />
            </Flex>
          ) : (
            <Button
              colorScheme="teal"
              padding={2}
              width="2xs"
              fontSize="md"
              type="submit"
              mb={4}
            >
              Ok
            </Button>
          )}
        </form>

        <Button
          onClick={() => history.push('/forget-password')}
          colorScheme="teal"
          padding={2}
          width="40"
          fontSize="sm"
          variant="outline"
        >
          Esqueci minha senha.
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
