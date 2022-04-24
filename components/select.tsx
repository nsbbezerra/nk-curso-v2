import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from "@chakra-ui/select";

interface Props {
  name: string;
  label?: string;
  children: any;
}

type InputProps = ChakraSelectProps & Props;

export default function Select({ name, label, children, ...rest }: InputProps) {
  const inputRef = useRef<HTMLSelectElement>(null);

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
      <ChakraSelect
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      >
        {children}
      </ChakraSelect>
    </>
  );
}
