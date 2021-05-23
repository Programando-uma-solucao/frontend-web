import React, { ComponentType } from 'react';
import {
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
  errorMessage: string;
}

const Input = ({
  rightElement: RightElement,
  leftElement: LeftElement,
  errorMessage,
  isInvalid,
  ...rest
}: InputProps) => {
  return (
    <InputGroup>
      {LeftElement ? (
        <InputLeftElement width="4.5rem">
          <InputLeftElement />
          <LeftElement />
        </InputLeftElement>
      ) : null}
      <ChakraInput
        errorBorderColor="red.500"
        mb={4}
        isInvalid={isInvalid}
        {...rest}
      />
      {isInvalid ? (
        <Text mb={3} fontSize="xs" color="red.400">
          {errorMessage}
        </Text>
      ) : null}
      {RightElement ? (
        <InputRightElement width="4.5rem">
          <InputRightElement />
          <RightElement />
        </InputRightElement>
      ) : null}
    </InputGroup>
  );
};

export default Input;
