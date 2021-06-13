import { Flex, Text } from '@chakra-ui/react';
import Lottie, { Options } from 'react-lottie';

import animationData from '../assets/animations/construction.json';

const options: Options = {
  animationData,
  autoplay: true,
  loop: false,
};

const IncomingFeature = () => {
  return (
    <Flex
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="lg" fontWeight="extrabold" textAlign="center">
        Em breve teremos esta página funcionando, estamos trabalhando o mais
        rápido possível.
      </Text>
      <Lottie options={options} width="90%" height="300px" />
    </Flex>
  );
};

export default IncomingFeature;
