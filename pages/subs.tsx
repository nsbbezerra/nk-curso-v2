import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Table,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { AiOutlineEdit, AiOutlineHome, AiOutlineSave } from "react-icons/ai";
import Lottie from "react-lottie";
import finishAnimation from "../animations/sub.json";
import { configs } from "../configs";
import { api } from "../configs/axios";

interface Subs {
  _id: string;
  name: string;
  cpf: string;
  identify: string;
  phone: string;
  email?: string;
  sala: string;
  obs?: string;
  status: "wait" | "confirmed" | "refused";
  created_at: Date;
}

interface Props {
  subs: Subs[];
}

const Subs: NextPage<Props> = ({ subs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [identify, setIdentify] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

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

  const handleOpen = (id: string) => {
    setIdentify(id);
    onOpen();
  };

  const handleUpdate = async () => {
    if (status === "") {
      showToast("Selecione uma opção", "warning", "Atenção");
      return false;
    }
    setLoading(true);
    try {
      const response = await api.put(`/update/${identify}`, {
        status,
      });
      console.log(response);
      showToast(response.data.message, "success", "Sucesso");
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.message) {
        showToast(error.response?.data.message, "error", "Erro");
      } else {
        let message = (error as Error).message;
        showToast(message, "error", "Erro");
      }
    }
  };

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

      <Container maxW={"6xl"} mt={10} mb={10}>
        <Box overflowX="scroll">
          <Table variant={"striped"} rounded={"md"} borderWidth="1px">
            <Thead>
              <Tr>
                <Th minW="280px">Nome</Th>
                <Th minW="140px">CPF</Th>
                <Th minW="170px">Telefone</Th>
                <Th minW="80px">Turma</Th>
                <Th minW="170px">Status</Th>
                <Th>Data</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subs.map((sb) => (
                <Tr key={sb._id}>
                  <Td w={"30%"}>{sb.name}</Td>
                  <Td>{sb.cpf}</Td>
                  <Td>{sb.phone}</Td>
                  <Td>{sb.sala}</Td>
                  <Td>
                    {(sb.status === "confirmed" && (
                      <HStack>
                        <Tag colorScheme={"green"}>Confirmada</Tag>
                        <IconButton
                          icon={<AiOutlineEdit />}
                          aria-label="Alterar status"
                          size="xs"
                          colorScheme={"blue"}
                          onClick={() => handleOpen(sb.identify)}
                        />
                      </HStack>
                    )) ||
                      (sb.status === "wait" && (
                        <HStack>
                          <Tag colorScheme={"yellow"}>Aguardando</Tag>
                          <IconButton
                            icon={<AiOutlineEdit />}
                            aria-label="Alterar status"
                            size="xs"
                            colorScheme={"blue"}
                            onClick={() => handleOpen(sb.identify)}
                          />
                        </HStack>
                      )) ||
                      (sb.status === "refused" && (
                        <HStack>
                          <Tag colorScheme={"red"}>Recusada</Tag>
                          <IconButton
                            icon={<AiOutlineEdit />}
                            aria-label="Alterar status"
                            size="xs"
                            colorScheme={"blue"}
                            onClick={() => handleOpen(sb.identify)}
                          />
                        </HStack>
                      ))}
                  </Td>
                  <Td>{sb.created_at.toString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alterar Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup onChange={setStatus} value={status}>
              <Stack>
                <Radio value="wait">Aguardando</Radio>
                <Radio value="confirmed">Confirmada</Radio>
                <Radio value="refused">Recusada</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handleUpdate}
              leftIcon={<AiOutlineSave />}
              isLoading={loading}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default Subs;

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${configs.api_url}/list`);
  const data = await response.json();
  const subs = !data ? null : data;

  return {
    props: { subs },
  };
};
