import { Flex, Text } from '@chakra-ui/react';
import Lottie, { Options, EventListener } from 'react-lottie';
import { useHistory } from 'react-router-dom';

import animationData from '../assets/animations/thanks.json';

const options: Options = {
  animationData,
  autoplay: true,
  loop: true,
};
const Acknowledgment = () => {
  const history = useHistory();

  const events: EventListener[] = [
    {
      eventName: 'loopComplete',
      callback: () => history.push('/lawyer-questions'),
    },
  ];

  return (
    <Flex
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="lg" fontWeight="extrabold">
        Obrigado por ajudar !
      </Text>
      <Lottie
        eventListeners={events}
        options={options}
        width={250}
        height={250}
      />
    </Flex>
  );
};

export default Acknowledgment;
