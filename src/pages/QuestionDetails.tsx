import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Spinner,
  Tag,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Lottie, { Options } from 'react-lottie';

import { TagsColors, TagsOptions } from '../common/data/tags';
import { getContrastColor } from '../common/utils/GetContrastColorText';
import { MatchedTags } from '../common/interfaces/MatchedTags';
import { QuestionService } from '../services/questionService';
import { GetResponseQuestion } from '../common/interfaces/GetResponseQuestion';
import animationData from '../assets/animations/noResponse.json';

interface LocationState {
  questionId: string;
  question: string;
  tags: string[];
  hasResponse: boolean;
}

const options: Options = {
  animationData,
  autoplay: true,
  loop: false,
};

const QuestionDetails = () => {
  const history = useHistory<LocationState>();
  const { tags, questionId, question, hasResponse } = history.location.state;

  const [loading, setLoading] = useState(hasResponse);
  const [questionResponse, setQuestionResponse] =
    useState<GetResponseQuestion | null>(null);

  const coloredTags = useMemo(() => {
    const colors: string[] = Object.values(TagsColors);
    const tagsWithcolors = Object.values(TagsOptions).map((tag, i) => ({
      tag,
      bgColor: colors[i],
      textColor: getContrastColor(colors[i]),
    }));

    const matchedTags = tags
      .map(tag => {
        return tagsWithcolors.find(option => option.tag === tag);
      })
      .filter(item => item) as MatchedTags[];

    return matchedTags;
  }, [tags]);

  useEffect(() => {
    async function recoverResponse() {
      setLoading(true);
      const questionService = new QuestionService();

      try {
        const response = await questionService.getQuestionResponse({
          questionId,
        });

        setQuestionResponse(response.data);
      } catch (error) {
        if (error.response.status === 404) return;

        toast(
          'Ocorreu um erro ao tentar recuperar a resposta, por favor tente mais tarde',
          { type: 'error' },
        );
      } finally {
        setLoading(false);
      }
    }
    if (hasResponse) recoverResponse();
  }, [hasResponse, questionId]);

  return (
    <Flex
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={5}
    >
      <Flex width="full" alignItems="center" justifyContent="space-between">
        <Text fontSize="larger">Detalhes da pergunta</Text>
        <Tooltip
          label={hasResponse ? 'Pergunta respondida' : 'Sem resposta'}
          placement="left"
          aria-label="A tooltip"
        >
          <Box
            width="5"
            height="5"
            borderRadius="full"
            backgroundColor={hasResponse ? 'green.200' : 'orange.200'}
          />
        </Tooltip>
      </Flex>

      <Flex width="full" flexWrap="wrap" mt={3}>
        {coloredTags.map(tag => (
          <Tag bg={tag.bgColor} color={tag.textColor} marginY={1} marginX={2}>
            {tag.tag}
          </Tag>
        ))}
      </Flex>

      <Box width="full" mb={5} mt={5}>
        <Text fontWeight="bold">Sua pergunta:</Text>
        <Text mt={2} fontStyle="italic" fontWeight="black">
          {question}
        </Text>
      </Box>

      <Divider />

      <Box mb="auto" width="full" mt={5}>
        <Text fontWeight="bold">Resposta:</Text>

        {loading ? (
          <Flex mt={2}>
            <Spinner
              color="teal"
              size="lg"
              marginLeft="auto"
              marginRight="auto"
            />
          </Flex>
        ) : null}

        {!loading && questionResponse ? (
          <>
            <Text mt={2}>{questionResponse.response}</Text>

            <Flex
              mt={5}
              width="full"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontStyle="oblique" fontSize="small">
                {questionResponse.lawyerName}
              </Text>

              <Tooltip
                label="Número na ordem"
                placement="left"
                aria-label="A tooltip"
              >
                <Text fontStyle="oblique" fontSize="small">
                  {questionResponse.lawyerRegister}
                </Text>
              </Tooltip>
            </Flex>
          </>
        ) : null}

        {!loading && !questionResponse ? (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={6}
          >
            <Text>Aguarando uma resposta...</Text>
            <Lottie options={options} width="150px" height="150px" />
          </Flex>
        ) : null}
      </Box>
    </Flex>
  );
};

export default QuestionDetails;
