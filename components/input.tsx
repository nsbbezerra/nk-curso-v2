import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/input";

interface Props {
  name: string;
  label?: string;
}

type InputProps = ChakraInputProps & Props;

export default function Input({ name, label, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <ChakraInput
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </>
  );
}
