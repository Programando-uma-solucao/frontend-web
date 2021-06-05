import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tag,
  Text,
  Flex,
  Button,
  Progress,
  Box,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { questionsScreening } from '../common/data/questionsScreening';
import { Question } from '../common/interfaces/Question';

const QuestionScreening = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [stepSubQuestions, setStepSubQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questionsScreening[0],
  );
  const [subQuestions, setSubQuestions] = useState<Question[]>([]);

  const history = useHistory();

  const onClose = () => setIsOpen(false);

  const resetSteps = () => {
    setCurrentQuestion(questionsScreening[0]);
    setStep(0);
    setStepSubQuestions(0);
    setSubQuestions([]);
    toast('Responda afirmativamente para pelo menos 01 pergunta', {
      type: 'warning',
      bodyStyle: {
        fontWeight: 'bold',
      },
    });
  };

  const addTagAndGoStep = (confirmed: boolean) => {
    setTags(state => [...state, currentQuestion.tag]);

    if (confirmed && currentQuestion.subQuestions.length) {
      setSubQuestions(currentQuestion.subQuestions);
      setCurrentQuestion(currentQuestion.subQuestions[0]);
      return;
    }

    if (confirmed && !currentQuestion.subQuestions.length) {
      onClose();
      toast(
        <Text>
          <CheckIcon marginRight={4} />
          Triagem concluída, faça agora sua pergunta.
        </Text>,
        {
          type: 'success',
          bodyStyle: {
            fontWeight: 'bold',
          },
        },
      );
      history.push('/ask-question', {
        tags,
      });
      return;
    }

    if (
      !confirmed &&
      subQuestions.length &&
      stepSubQuestions + 1 < subQuestions.length
    ) {
      setCurrentQuestion(subQuestions[stepSubQuestions + 1]);
      setStepSubQuestions(state => state + 1);
      return;
    }

    if (
      !confirmed &&
      subQuestions.length &&
      stepSubQuestions + 1 === subQuestions.length
    ) {
      resetSteps();
      return;
    }

    if (!confirmed && step + 1 < questionsScreening.length) {
      setSubQuestions([]);
      setStepSubQuestions(0);
      setCurrentQuestion(questionsScreening[step + 1]);
      setStep(state => state + 1);
      return;
    }

    resetSteps();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInRight"
      size="xs"
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader display="flex" justifyContent="flex-start" flexFlow="wrap">
          <Tag
            bg={currentQuestion.color}
            color={currentQuestion.textColor}
            marginY={1}
            marginX={2}
          >
            {currentQuestion.tag}
          </Tag>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box>
            <Text fontSize="x-large" fontWeight="extrabold">
              {step + 1}
              {subQuestions.length ? `.${stepSubQuestions}` : null}
            </Text>
            <Text textAlign="start" marginY={4}>
              {currentQuestion.question}
            </Text>
          </Box>

          <Progress
            value={subQuestions.length ? stepSubQuestions + 1 : step + 1}
            max={
              subQuestions.length
                ? subQuestions.length
                : questionsScreening.length
            }
            size="md"
            colorScheme="green"
          />
        </ModalBody>

        <ModalFooter display="block">
          <Flex justifyContent="space-around">
            <Button
              size="md"
              width="24"
              bg="teal"
              color="white"
              type="button"
              variant="solid"
              onClick={() => addTagAndGoStep(true)}
            >
              Sim
            </Button>
            <Button
              size="md"
              width="24"
              color="teal"
              borderColor="teal"
              type="button"
              variant="outline"
              onClick={() => addTagAndGoStep(false)}
            >
              Não
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestionScreening;
