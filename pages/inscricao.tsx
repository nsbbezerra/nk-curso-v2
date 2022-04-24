import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Tr,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import {
  AiOutlineDollar,
  AiOutlineHome,
  AiOutlineSearch,
} from "react-icons/ai";
import Lottie from "react-lottie";
import finishAnimation from "../animations/sub.json";
import InputMask from "../components/inputmask";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import axios from "axios";
import { api } from "../configs/axios";
import { useRouter } from "next/router";

interface Props {
  cpf: string;
}

interface Subscribe {
  cpf: string;
  created_at: Date;
  email?: string;
  identify: string;
  name: string;
  obs?: string;
  phone: string;
  sala: string;
  status: "wait" | "confirmed" | "refused";
}

const Inscricao: NextPage = () => {
  const formRef = useRef<FormHandles>(null);
  const toast = useToast();
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [payLoading, setPayLoading] = useState<boolean>(false);
  const [subscribe, setSubscribe] = useState<Subscribe>();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: finishAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  function showToast(
    message: string,
    status: "error" | "info" | "warning" | "success" | undefined,
    title: string
  ) {
    toast({
      title: title,
      description: message,
      status: status,
      position: "top-right",
      duration: 8000,
      isClosable: true,
    });
  }

  const handleSubmit: SubmitHandler<Props> = async (data) => {
    try {
      const schema = Yup.object().shape({
        cpf: Yup.string().required("Insira o seu CPF"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      setLoading(true);
      const response = await api.get(`/find_subscribe/${data.cpf}`);
      setSubscribe(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          showToast(err.message, "error", "Erro");
        });
      }
      if (axios.isAxiosError(error) && error.message) {
        showToast(error.response?.data.message, "error", "Erro");
      }
    }
  };

  async function handlePay(id: string) {
    setPayLoading(true);
    try {
      const response = await api.post(`/pay_again/${id}`);
      showToast(response.data.message, "success", "Sucesso");
      push(response.data.url);
    } catch (error) {
      setPayLoading(false);
      if (axios.isAxiosError(error) && error.message) {
        showToast(error.response?.data.message, "error", "Erro");
      } else {
        let message = (error as Error).message;
        showToast(message, "error", "Erro");
      }
    }
  }

  return (
    <Fragment>
      <Head>
        <title>NK Informática | Desenvolvendo o Mundo com você!</title>
        <meta
          name="description"
          content="Curso de desenvolvimento de sites e softwares"
        />
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      <Box w="100%" position={"relative"}>
        <Box w="100%" pt={5}>
          <Container maxW={"6xl"}>
            <Flex align={"center"} justify="space-between" h="60px">
              <Box w="70px" zIndex={1000} rounded="lg">
                <Image
                  src={"/img/logo.svg"}
                  height={60}
                  width={100}
                  layout="responsive"
                  alt="Logo NK Informática"
                />
              </Box>

              <HStack>
                <Link href={"/"} passHref>
                  <Button
                    leftIcon={<AiOutlineHome />}
                    zIndex={1000}
                    variant="ghost"
                  >
                    Início
                  </Button>
                </Link>
              </HStack>
            </Flex>
          </Container>

          <Container maxW={"6xl"}>
            <Flex
              justify={"center"}
              align="center"
              direction={"column"}
              gap={3}
            >
              <Box w={["50%", "30%", "30%", "30%", "30%"]} zIndex={100}>
                <Lottie
                  options={defaultOptions}
                  width="100%"
                  isClickToPauseDisabled
                />
              </Box>
            </Flex>
          </Container>
        </Box>
        <Image
          src="/img/wave.svg"
          objectFit="cover"
          layout="fill"
          alt="Imagem NK Curso"
          draggable={false}
        />
      </Box>

      <Container mt={10} maxW="5xl" mb={10}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Flex align={"end"} gap={3} w="fit-content">
            <FormControl>
              <FormLabel>Digite seu CPF</FormLabel>
              <InputMask name="cpf" mask="999.999.999-99" />
            </FormControl>
            <Button
              leftIcon={<AiOutlineSearch />}
              type="submit"
              colorScheme={"blue"}
              px={10}
              isLoading={loading}
            >
              Buscar
            </Button>
          </Flex>
        </Form>

        {JSON.stringify(subscribe) !== "{}" && (
          <Box mt={5} rounded="md" borderWidth={"1px"} overflow="hidden">
            <Table variant={"striped"}>
              <Tbody>
                <Tr>
                  <Td fontWeight={"bold"}>Nome</Td>
                  <Td>{subscribe?.name}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>CPF</Td>
                  <Td>{subscribe?.cpf}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Telefone</Td>
                  <Td>{subscribe?.phone}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Turma</Td>
                  <Td>{subscribe?.sala}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Observação</Td>
                  <Td>{subscribe?.obs}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Status da Inscrição</Td>
                  <Td>
                    {subscribe?.status === "confirmed" && (
                      <Stack>
                        <Tag colorScheme={"green"} w="fit-content">
                          Inscrição Confirmada
                        </Tag>
                      </Stack>
                    )}
                    {subscribe?.status === "wait" && (
                      <Stack>
                        <Tag colorScheme={"yellow"} size="lg" w="fit-content">
                          Aguardando o Pagamento
                        </Tag>
                        <Button
                          colorScheme={"blue"}
                          leftIcon={<AiOutlineDollar />}
                          w="fit-content"
                          size="sm"
                          variant={"outline"}
                          onClick={() => handlePay(subscribe.identify)}
                          isLoading={payLoading}
                        >
                          Pagar Agora
                        </Button>
                      </Stack>
                    )}
                    {subscribe?.status === "refused" && (
                      <Stack>
                        <Tag colorScheme={"red"} size="lg" w="fit-content">
                          Pagamento Recusado
                        </Tag>
                        <Button
                          colorScheme={"blue"}
                          leftIcon={<AiOutlineDollar />}
                          w="fit-content"
                          size="sm"
                          variant={"outline"}
                          onClick={() => handlePay(subscribe.identify)}
                          isLoading={payLoading}
                        >
                          Pagar Agora
                        </Button>
                      </Stack>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight={"bold"}>Data da Inscrição</Td>
                  <Td>
                    {subscribe?.created_at.toLocaleString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        )}
      </Container>
    </Fragment>
  );
};

export default Inscricao;
