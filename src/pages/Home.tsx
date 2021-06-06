import { Image, Flex, Text, Box } from '@chakra-ui/react';

import Logo from '../assets/icon.svg';

const Home = () => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
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
          width="150"
          height="150"
          marginX="auto"
        />

        <Text textAlign="center" padding="5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem
          harum molestiae facere impedit totam ad? Libero deleniti quae aut.
          Aliquid ex voluptates vel pariatur! Impedit fuga voluptatibus corporis
          iure.
        </Text>

        <Text textAlign="center" padding="5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt rem
          harum molestiae facere impedit totam ad? Libero deleniti quae aut.
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;
