import { Image, Flex, Text, Box } from '@chakra-ui/react';

import Logo from '../assets/icon.svg';

const Home = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      paddingX={5}
    >
      <Box>
        <Text
          fontFamily="Merienda"
          fontSize="4xl"
          textAlign="center"
          color="teal.500"
          marginY="25"
        >
          Una Facilita
        </Text>

        <Image
          src={Logo}
          alt="Programando uma Solução Logo"
          width="130"
          height="130"
          marginX="auto"
          mb={2}
        />

        <Text textAlign="center" paddingY="1">
          Desenvolvido pelos alunos do projeto de extensão “Programando uma
          solução”, do Centro Universitário UNA Betim, o Facilita UNA é uma
          aplicação que visa fornecer soluções acessíveis e gratuitas para seus
          usuários.
        </Text>

        <Text textAlign="center" paddingY="1">
          Como principal ferramenta temos a aproximação de pessoas em situação
          de vulnerabilidade econômica com advogados, para que aqueles possam
          expor suas dúvidas jurídicas e tem um aconselhamento profissional, de
          maneira gratuita.
        </Text>

        <Text textAlign="center" paddingY="1">
          Mais novidades serão incluídas nos próximos semestres, tornando a
          aplicação cada vez mais completa funcional. Nos ajude a divulgar nosso
          trabalho, apresente a aplicação para seus conhecidos.
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;
