import React, { ComponentType } from 'react';
import {
  Box,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { IconProps } from '@chakra-ui/icons';

interface InputProps extends ChakraInputProps {
  rightElement?: ComponentType<IconProps>;
  leftElement?: ComponentType<IconProps>;
  rightElementClick?: () => void;
  leftElementClick?: () => void;
  errorMessage: string;
}

const Input = ({
  rightElement: RightElement,
  leftElement: LeftElement,
  rightElementClick,
  leftElementClick,
  errorMessage,
  isInvalid,
  ...rest
}: InputProps) => {
  return (
    <Box mb={4}>
      <InputGroup>
        {LeftElement ? (
          <InputLeftElement onClick={leftElementClick}>
            <InputLeftElement children={<LeftElement color="gray.400" />} />
          </InputLeftElement>
        ) : null}
        <ChakraInput
          errorBorderColor="red.500"
          isInvalid={isInvalid}
          {...rest}
        />
        {RightElement ? (
          <InputRightElement onClick={rightElementClick}>
            <InputRightElement children={<RightElement color="gray.400" />} />
          </InputRightElement>
        ) : null}
      </InputGroup>
      {isInvalid ? (
        <Text
          width="full"
          marginBottom={3}
          marginTop={1}
          fontSize="xs"
          color="red.400"
        >
          {errorMessage}
        </Text>
      ) : null}
    </Box>
  );
};

export default Input;
