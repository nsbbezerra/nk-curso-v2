import React, { useRef, useEffect } from "react";
import ReactInputMask, { Props as InputProps } from "react-input-mask";
import { Input, InputProps as ChakraInputProps } from "@chakra-ui/input";

import { useField } from "@unform/core";

interface Props extends InputProps {
  name: string;
}

type InputMaksProps = Props & ChakraInputProps;

export default function InputMask({ name, ...rest }: InputMaksProps) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue("");
      },
    });
  }, [fieldName, registerField]);

  return (
    <Input
      as={ReactInputMask}
      ref={inputRef}
      defaultValue={defaultValue}
      {...rest}
    />
  );
}
