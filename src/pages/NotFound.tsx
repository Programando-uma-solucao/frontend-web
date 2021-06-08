import { Flex, Text } from '@chakra-ui/react';
import Lottie, { Options } from 'react-lottie';

import animationData from '../assets/animations/404animation.json';

const options: Options = {
  animationData,
  autoplay: true,
  loop: true,
};

const NotFound = () => {
  return (
    <Flex
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="lg" fontWeight="extrabold">
        Página não encontrada
      </Text>
      <Lottie options={options} width={250} height={250} />
    </Flex>
  );
};

export default NotFound;
