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
    <InputGroup>
      {LeftElement ? (
        <InputLeftElement onClick={leftElementClick}>
          <InputLeftElement children={<LeftElement color="gray.400" />} />
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
        <InputRightElement onClick={rightElementClick}>
          <InputRightElement children={<RightElement color="gray.400" />} />
        </InputRightElement>
      ) : null}
    </InputGroup>
  );
};

export default Input;
