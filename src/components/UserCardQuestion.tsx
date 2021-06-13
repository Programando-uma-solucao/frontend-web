import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Tag,
  Text,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';

import { TagsOptions, TagsColors } from '../common/data/tags';
import { getContrastColor } from '../common/utils/GetContrastColorText';

interface Props {
  id: string;
  hasResponse: boolean;
  tags: string[];
  question: string;
}

interface MatchedTags {
  tag: string;
  bgColor: string;
  textColor: string;
}

const UserCardQuestion = ({ id, hasResponse, tags, question }: Props) => {
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

  const history = useHistory();

  const [isLargerThan500] = useMediaQuery('(min-width: 500px)');

  const goToDetails = () => {
    history.push('/question/details', {
      questionId: id,
      hasResponse,
      tags,
      question,
    });
  };

  return (
    <Box
      borderWidth={3}
      borderColor="whitesmoke"
      p={3}
      backgroundColor="gray.50"
      marginX={5}
      marginY={2}
      position="relative"
      maxWidth="500px"
      width={isLargerThan500 ? '500px' : 'auto'}
    >
      {coloredTags.map(tag => (
        <Tag bg={tag.bgColor} color={tag.textColor} marginY={1} marginRight={1}>
          {tag.tag}
        </Tag>
      ))}

      <Tooltip
        label={hasResponse ? 'Pergunta respondida' : 'Sem resposta'}
        placement="left"
        aria-label="A tooltip"
      >
        <Box
          position="absolute"
          top="2"
          right="2"
          width="5"
          height="5"
          borderRadius="full"
          backgroundColor={hasResponse ? 'green.200' : 'orange.200'}
        />
      </Tooltip>

      <Flex flexDirection="column" mt={3}>
        <Text maxWidth="90%">{question.slice(0, 50)}...</Text>
        <Button
          bg="teal"
          color="white"
          width="16"
          size="sm"
          mt={3}
          onClick={goToDetails}
        >
          Ver
        </Button>
      </Flex>
    </Box>
  );
};

export default UserCardQuestion;
