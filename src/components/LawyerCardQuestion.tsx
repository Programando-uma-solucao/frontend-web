import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Flex, Image, Tag, Text, useMediaQuery } from '@chakra-ui/react';

import { TagsOptions, TagsColors } from '../common/data/tags';
import { getContrastColor } from '../common/utils/GetContrastColorText';
import ReplyIcon from '../assets/reply.svg';
import { MatchedTags } from '../common/interfaces/MatchedTags';

interface Props {
  id: string;
  questionerName: string;
  tags: string[];
  question: string;
}

const LawyerCardQuestion = ({ id, questionerName, tags, question }: Props) => {
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

  const [isLargerThan500] = useMediaQuery('(min-width: 500px)');
  const history = useHistory();

  const goToDetails = () => {
    history.push('/answer-question', {
      questionId: id,
      questionerName,
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
    >
      <Text fontWeight="black" mb={3}>
        {questionerName}
      </Text>

      {coloredTags.map(tag => (
        <Tag bg={tag.bgColor} color={tag.textColor} marginY={1} marginX={2}>
          {tag.tag}
        </Tag>
      ))}

      <Flex justifyContent="space-between" alignItems="center" mt={3}>
        <Text maxWidth={isLargerThan500 ? 400 : '80%'}>
          {question.slice(0, isLargerThan500 ? 70 : 50)}...
        </Text>
        <Box borderRadius="full" bg="teal" p={2} height={10}>
          <Image onClick={goToDetails} src={ReplyIcon} width={6} height={6} />
        </Box>
      </Flex>
    </Box>
  );
};

export default LawyerCardQuestion;
