import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  FormLabel,
  Image,
  Text,
  Radio,
  RadioGroup,
  Button,
  Select,
  Checkbox,
  Spinner,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { cpf } from 'cpf-cnpj-validator';
import ReactSelect from 'react-select';
import { useHistory } from 'react-router-dom';

import Logo from '../assets/icon.svg';
import Input from '../components/Input';
import ModalTermsUse from '../components/ModalTermsUse';
import { TagsOptions } from '../common/data/tags';
import { RegisterService } from '../services/registerService';
import { useAuth } from '../hooks/auth';
import { getJwtPayload } from '../common/utils/DecryptTokenData';

interface FormInputs {
  role: 'LAWYER' | 'COMMOM';
  name: string;
  email: string;
  phone: string;
  document: string;
  sex: 'M' | 'F';
  address: string;
  password: string;
  terms: boolean;
  oab?: string;
  tags?: { label: string; value: string }[];
  secretQuestion: string;
  secretAnswer: string;
}

interface PayloadRequest extends Omit<FormInputs, 'tags' | 'document'> {
  tags?: string[];
  cpf: string;
}

const tagLabels = Object.values(TagsOptions);

const selectTagOptions = tagLabels.map(tag => ({
  value: tag,
  label: tag,
}));

const schema = yup.object().shape({
  oab: yup.string().when('role', {
    is: (value: string) => value === 'LAWYER',
    then: yup.string().required('Obrigatório informar seu registro'),
    otherwise: yup.string().notRequired(),
  }),
  tags: yup.mixed().when('role', {
    is: (value: string) => value === 'LAWYER',
    then: yup.array().min(1).required('Obrigatório informar ao menos uma tag'),
    otherwise: yup.array().notRequired(),
  }),
  role: yup.mixed().required('Selecione pelo menos uma opção'),
  name: yup
    .string()
    .required('Obrigatório informar o nome')
    .test('name', 'Informe nome e sobrenome', value => {
      return Boolean(value && value.split(' ').length >= 2);
    }),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('Obrigatório informar email'),
  phone: yup
    .string()
    .required('Obrigatório informar telefone')
    .test('phone', 'Digite apenas o DDD e um número válido', value => {
      const regex = new RegExp(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/);

      return Boolean(value && regex.test(value));
    }),
  document: yup
    .string()
    .required('Obrigatório informar CPF')
    .test('document', 'Digite um CPF válido', value => {
      return Boolean(value && cpf.isValid(value));
    }),
  sex: yup.string().required('Obrigatório informar o sexo'),
  address: yup.string().required('Obrigatório informar endereço'),
  password: yup.string().required('Obrigatório informar senha'),
  terms: yup.bool().oneOf([true], 'É preciso aceitar os termos para continuar'),
  secretQuestion: yup
    .string()
    .required('Obrigatório informar a pergunta secreta'),
  secretAnswer: yup
    .string()
    .required('Obrigatório informar a resposta da pergunta secreta'),
});

const RegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    setError,
    clearErrors,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const watchFields = watch();
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (Object.values(errors).length)
      toast('Verifique novamente o formulário', { type: 'warning' });
  }, [errors]);

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    clearErrors();
    const formattedTags = data.tags && data.tags.map(tag => tag.value);

    const payload: PayloadRequest = {
      ...data,
      tags: formattedTags,
      cpf: data.document,
    };

    const registerService = new RegisterService();

    try {
      const response = await registerService.register(payload);
      setLoading(false);

      const { email, id, name, role } = getJwtPayload(response.data.token);

      toast('Registro criado com sucesso!', { type: 'success' });

      auth.storeSession(response.data.token, { email, id, name, role });

      history.push('/');
    } catch (err) {
      setLoading(false);
      if (err.response.data.statusCode === 400) {
        setError('email', { message: 'Já existe uma conta com este email' });
        setError('document', { message: 'Já existe uma conta com este CPF' });
        toast('Já existe uma conta com este email ou CPF', { type: 'warning' });
        return;
      }

      toast(
        'Ocorreu um erro ao criar seu cadastro, por favor tente novamente',
        { type: 'error' },
      );
    }
  };

  return (
    <Flex direction="column" alignItems="center" padding={5}>
      <Box padding={4}>
        <Text fontSize="xx-large" fontFamily="Merienda" marginBottom={2}>
          Una Facilita
        </Text>
        <Image src={Logo} width="90" height="90" marginX="auto" />
      </Box>

      <Box>
        <Text fontSize="x-large">Bem vindo, por informe seus dados</Text>
      </Box>

      <Box maxW="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box marginY={2.5}>
            <RadioGroup>
              <FormLabel color="teal" fontWeight="bold">
                É um advogado?
              </FormLabel>
              <Box display="flex" justifyContent="space-around" width="xs">
                <Radio
                  id="lawyer"
                  size="md"
                  value="LAWYER"
                  isInvalid={!!errors.role}
                  {...register('role')}
                >
                  Sim
                </Radio>

                <Radio
                  id="commom"
                  size="md"
                  value="COMMOM"
                  isInvalid={!!errors.role}
                  {...register('role')}
                >
                  Não
                </Radio>
              </Box>
              {errors.role ? (
                <Text color="red.400">{errors.role.message}</Text>
              ) : null}
            </RadioGroup>
          </Box>

          {watchFields.role === 'LAWYER' ? (
            <>
              <Box marginY={2.5}>
                <FormLabel color="teal" fontWeight="bold">
                  Registro na Ordem
                </FormLabel>
                <Input
                  placeholder="Seu registro aqui"
                  errorMessage={errors.oab?.message}
                  isInvalid={!!errors.oab}
                  {...register('oab')}
                />
              </Box>

              <Box marginY={2.5}>
                <FormLabel color="teal" fontWeight="bold">
                  Selecione tags da sua especialidade
                </FormLabel>
                <Controller
                  control={control}
                  name="tags"
                  render={({ field }) => (
                    <ReactSelect
                      isMulti
                      options={selectTagOptions}
                      {...field}
                    />
                  )}
                />
                {errors.tags ? (
                  <Text color="red.400" fontSize={12}>
                    Obrigatório informar ao menos uma tag
                  </Text>
                ) : null}
              </Box>
            </>
          ) : null}

          <Box marginY={2.5}>
            <FormLabel color="teal" fontWeight="bold">
              Nome
            </FormLabel>
            <Input
              placeholder="Nome Sobrenome"
              errorMessage={errors.name?.message}
              isInvalid={!!errors.name}
              {...register('name')}
            />
          </Box>

          <Box marginY={2.5}>
            <FormLabel color="teal" fontWeight="bold">
              Email
            </FormLabel>
            <Input
              placeholder="email@exemplo.com"
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
              {...register('email')}
            />
          </Box>

          <Box marginY={2.5}>
            <FormLabel color="teal" fontWeight="bold">
              Telefone
            </FormLabel>
            <Input
              placeholder="(99) 9 9999-9999"
              errorMessage={errors.phone?.message}
              isInvalid={!!errors.phone}
              {...register('phone')}
            />
          </Box>

          <Box marginY={2.5}>
            <FormLabel color="teal" fontWeight="bold">
              CPF
            </FormLabel>
            <Input
              placeholder="999.999.999-99"
              errorMessage={errors.document?.message}
              isInvalid={!!errors.document}
              {...register('document')}
            />
          </Box>

          <Box marginY={2.5}>
            <FormLabel color="teal" fontWeight="bold">
              Sexo
            </FormLabel>
            <Select
              isInvalid={!!errors.sex}
              {...register('sex')}
              color="gray"
              placeholder="Selecione"
            >
              <option value="F">Mulher</option>
              <option value="M">Homem</option>
            </Select>
            {errors.sex?.message ? (
              <Text
                width="full"
                marginBottom={3}
                marginTop={1}
                fontSize="xs"
                color="red.400"
              >
                {errors.sex?.message}
              </Text>
            ) : null}
          </Box>

          <Box marginY={2.5}>
            <FormLabel color="teal" fontWeight="bold">
              Endereço
            </FormLabel>
            <Input
              placeholder="Rua, N, Bairro"
              errorMessage={errors.address?.message}
              isInvalid={!!errors.address}
              {...register('address')}
            />
          </Box>

          <Box marginY={2.5}>
            <FormLabel color="teal" fontWeight="bold">
              Senha
            </FormLabel>
            <Input
              placeholder="********"
              type="password"
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
              {...register('password')}
            />
          </Box>

          <Box marginY={2.5}>
            <FormLabel color="teal" fontWeight="bold">
              Pergunta secreta
            </FormLabel>
            <Input
              placeholder="Nome do meu primeiro cachorro"
              errorMessage={errors.secretQuestion?.message}
              isInvalid={!!errors.secretQuestion}
              {...register('secretQuestion')}
            />
          </Box>

          <Box marginY={2.5}>
            <FormLabel color="teal" fontWeight="bold">
              Resposta secreta
            </FormLabel>
            <Input
              placeholder="Spike"
              errorMessage={errors.secretAnswer?.message}
              isInvalid={!!errors.secretAnswer}
              {...register('secretAnswer')}
            />
          </Box>

          <Box marginY={4} onClick={() => setModalOpen(true)}>
            <Checkbox {...register('terms')}>
              Aceito os termos e condições de uso da plataforma.
            </Checkbox>
            {errors.terms ? (
              <Text color="red.400">{errors.terms?.message}</Text>
            ) : null}
          </Box>

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
              bg="teal"
              color="white"
              width="full"
              size="sm"
              variant="solid"
              type="submit"
              marignX="auto"
            >
              Confirmar
            </Button>
          )}
        </form>
      </Box>

      <ModalTermsUse
        accept={() => {
          setValue('terms', true);
          setModalOpen(false);
        }}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Flex>
  );
};

export default RegisterUser;
