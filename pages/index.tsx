import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Link as ChakraLink,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  FormLabel,
  Stack,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineForm,
  AiOutlineHome,
  AiOutlineInfo,
  AiOutlineMenu,
  AiOutlineOrderedList,
  AiOutlineUser,
  AiOutlineSave,
} from "react-icons/ai";
import pcAnimation from "../animations/dev.json";
import Lottie from "react-lottie";
import { BsMegaphone } from "react-icons/bs";
import { FaDiscord, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

import Select from "../components/select";
import Input from "../components/input";
import ReactInputMask from "../components/inputmask";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import axios from "axios";
import { api } from "../configs/axios";
import * as Yup from "yup";
import { useRouter } from "next/router";

interface ISubscribe {
  name: string;
  cpf: string;
  phone: string;
  email?: string;
  sala: string;
  obs?: string;
}

const Home: NextPage = () => {
  const formRef = useRef<FormHandles>(null);
  const toast = useToast();
  const { push } = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pcAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSubmit: SubmitHandler<ISubscribe> = async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Insira o seu nome"),
        cpf: Yup.string().required("Insira o seu CPF"),
        phone: Yup.string().required("Insira o seu telefone"),
        email: Yup.string().email("Insira um email válido"),
        sala: Yup.string().required("Insira um período de estudo"),
        obs: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      const response = await api.post("/subscribe", data);
      showToast(response.data.message, "success", "Sucesso");
      setLoading(false);
      push(response.data.url);
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

              <HStack display={["none", "none", "flex", "flex", "flex"]}>
                <Link href={"/"} passHref>
                  <Button
                    leftIcon={<AiOutlineHome />}
                    zIndex={1000}
                    variant="ghost"
                  >
                    Início
                  </Button>
                </Link>
                <Link href={"#objetivos"} passHref>
                  <Button
                    leftIcon={<AiOutlineOrderedList />}
                    zIndex={1000}
                    variant="ghost"
                  >
                    Objetivos
                  </Button>
                </Link>
                <Link href={"#inscricao"} passHref>
                  <Button
                    leftIcon={<AiOutlineForm />}
                    zIndex={1000}
                    variant="ghost"
                  >
                    Inscrição
                  </Button>
                </Link>
                <Link href="#sobre" passHref>
                  <Button
                    leftIcon={<AiOutlineInfo />}
                    zIndex={1000}
                    variant="ghost"
                  >
                    Sobre Nós
                  </Button>
                </Link>
                <Link href={"/inscricao"} passHref>
                  <Button
                    leftIcon={<AiOutlineUser />}
                    zIndex={1000}
                    colorScheme="blackAlpha"
                  >
                    Minha Inscrição
                  </Button>
                </Link>
              </HStack>
              <HStack display={["flex", "flex", "none", "none", "none"]}>
                <Link href={"/inscricao"} passHref>
                  <Button leftIcon={<AiOutlineUser />} zIndex={1000}>
                    Minha Inscrição
                  </Button>
                </Link>
                <IconButton
                  aria-label="Menu"
                  icon={<AiOutlineMenu />}
                  zIndex={1000}
                />
              </HStack>
            </Flex>
          </Container>

          <Container maxW={"6xl"}>
            <Grid
              templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr"]}
              gap={10}
              justifyItems="center"
              mt={[5, 5, 0, 0, 0]}
            >
              <Box w={["90%", "50%", "80%", "80%", "80%"]} zIndex={100}>
                <Lottie
                  options={defaultOptions}
                  width="100%"
                  isClickToPauseDisabled
                />
              </Box>
              <Flex
                justify={"start"}
                align="center"
                direction={"column"}
                mt={[0, 0, 5, 5, 5]}
                gap={3}
                pt={[0, 0, 0, 10, 10]}
              >
                <Heading zIndex={100} textAlign="center" color={"gray.900"}>
                  Master Class de iniciação à programação Web
                </Heading>
                <Text zIndex={100} textAlign="center" fontSize={"lg"}>
                  Aprenda a desenvolver com as tecnologias mais usadas pelas
                  grandes empresas, Utilizaremos 3 teconologias: HTML, CSS e
                  JavaScript
                </Text>
              </Flex>
            </Grid>
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

      <Container maxW={"6xl"} mt={10}>
        <Grid
          templateColumns={[
            "1fr",
            "1fr",
            "1fr 250px",
            "1fr 250px",
            "1fr 250px",
          ]}
          gap={5}
        >
          <Box id="objetivos">
            <Box w="fit-content">
              <Heading>Objetivos do Curso</Heading>
              <Box
                w="100%"
                h="5px"
                bgGradient="linear(to-r, blue.200, blue.500)"
              />
            </Box>
            <List spacing={2} mt={5}>
              <ListItem>
                <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                Entender a estrutura básica de uma pagina HTML.
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                Entender a estrutura de um Website.
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                Aprender os conceitos básicos de HTML.
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                Aprender a ler a escrever e a identificar a tags de uma pagina.
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                Aprender a desenvolver formulários.
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                Aprender a dar estilo as paginas HTML.
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                Aprender como criar um Website completo
              </ListItem>
            </List>

            <Box w="fit-content" mt={10}>
              <Heading>Certificação</Heading>
              <Box
                w="100%"
                h="5px"
                bgGradient="linear(to-r, blue.200, blue.500)"
              />
            </Box>
            <Text fontSize={"lg"} mt={5}>
              Este curso contem um certificado de participação e estará
              disponível conta após a conclusão do curso.
            </Text>

            <Box w="fit-content" mt={10}>
              <Heading>Fique por Dentro!</Heading>
              <Box
                w="100%"
                h="5px"
                bgGradient="linear(to-r, blue.200, blue.500)"
              />
            </Box>

            <Text mt={5}>
              Tenha acesso à mais informações do curso na nossa comunidade,
              entre bata um papo com os participantes e com o instrutor do
              curso, saiba os horários, tenha acesso aos conteúdos com
              antecedência, e tire todas as suas dúvidas.
            </Text>

            <Button
              leftIcon={<FaDiscord />}
              colorScheme="purple"
              size="lg"
              mt={5}
            >
              Participar da comunidade no Discord
            </Button>

            <Box w="fit-content" mt={10}>
              <Heading>Requisitos mínimos</Heading>
              <Box
                w="100%"
                h="5px"
                bgGradient="linear(to-r, blue.200, blue.500)"
              />
            </Box>

            <List spacing={2} mt={5}>
              <ListItem>
                <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                Possuir um Notebook ou Computador
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                Ter conexão com a internet
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineCheckCircle} color="green.500" />
                Baixar e instalar o{" "}
                <Link href="https://www.skype.com/pt-br/get-skype/" passHref>
                  <ChakraLink
                    target={"_blank"}
                    color="blue.500"
                    _hover={{ textDecor: "underline" }}
                  >
                    Skipe <Icon as={FaExternalLinkAlt} fontSize="sm" ml={1} />
                  </ChakraLink>
                </Link>
                , a Master Class será ministrada online 3 vezes por semana
              </ListItem>
            </List>

            <Box w="fit-content" mt={10}>
              <Heading>Conteúdo do Curso</Heading>
              <Box
                w="100%"
                h="5px"
                bgGradient="linear(to-r, blue.200, blue.500)"
              />
            </Box>

            <Box mt={5} borderWidth="1px" rounded={"md"}>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Assunto</Th>
                    <Th w="15%">Duração</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Introdução ao Curso</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Instalação da Stack de desenvolvimento, IDE e Browser
                    </Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>Fundamentos do HTML, Sintaxe e Semântica</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>Elementos do HTML: Tags, Atributos e etc...</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>Estrutura do Cabeçalho de um site</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>Iniciando no CSS, monstrando e estilizando textos</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      Formatação de textos, identação, alinhamento, tamanhos e
                      etc...
                    </Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>CSS - Referenciando elementos, Classes e IDs</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>CSS - Trabalhando com estilização em cores</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>CSS - Iniciando com Box Model</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>CSS - Posicionamento de elementos, FlexBox e Grid</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>Iniciando no JavaScript - Apresentação inicial</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>JavaScript - Variáveis e Funções</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      JavaScript - Maninupando o HTML (DOM) através dos eventos
                    </Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>Trabalhando com formulários</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td>Estruturando uma página de um site</Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight={"bold"}>
                      Criando 5 Projetos - Clone de Sites
                    </Td>
                    <Td w="15%">Aprox. 1 Hora</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            <Box w="fit-content" mt={10}>
              <Heading>Projetos que iremos clonar</Heading>
              <Box
                w="100%"
                h="5px"
                bgGradient="linear(to-r, blue.200, blue.500)"
              />
            </Box>

            <Grid
              templateColumns={[
                "repeat(2, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(5, 1fr)",
                "repeat(5, 1fr)",
              ]}
              gap={3}
              mt={5}
            >
              <Box>
                <Box rounded="sm" overflow={"hidden"} borderWidth="1px">
                  <Image
                    src="/img/twitter.png"
                    objectFit="cover"
                    width={400}
                    height={200}
                    layout="responsive"
                    alt="Imagem NK Curso"
                    draggable={false}
                  />
                </Box>
                <Text>Twitter</Text>
              </Box>
              <Box>
                <Box rounded="sm" overflow={"hidden"} borderWidth="1px">
                  <Image
                    src="/img/instagram.png"
                    objectFit="cover"
                    width={400}
                    height={200}
                    layout="responsive"
                    alt="Imagem NK Curso"
                    draggable={false}
                  />
                </Box>
                <Text>Instagram</Text>
              </Box>
              <Box>
                <Box rounded="sm" overflow={"hidden"} borderWidth="1px">
                  <Image
                    src="/img/spotify.png"
                    objectFit="cover"
                    width={400}
                    height={200}
                    layout="responsive"
                    alt="Imagem NK Curso"
                    draggable={false}
                  />
                </Box>
                <Text>Spotify</Text>
              </Box>
              <Box>
                <Box rounded="sm" overflow={"hidden"} borderWidth="1px">
                  <Image
                    src="/img/facebook.jpg"
                    objectFit="cover"
                    width={400}
                    height={200}
                    layout="responsive"
                    alt="Imagem NK Curso"
                    draggable={false}
                  />
                </Box>
                <Text>Facebook</Text>
              </Box>
              <Box>
                <Box rounded="sm" overflow={"hidden"} borderWidth="1px">
                  <Image
                    src="/img/youtube.png"
                    objectFit="cover"
                    width={400}
                    height={200}
                    layout="responsive"
                    alt="Imagem NK Curso"
                    draggable={false}
                  />
                </Box>
                <Text>Youtube</Text>
              </Box>
            </Grid>
          </Box>
          <Box
            rounded={"md"}
            borderWidth="1px"
            p={4}
            position={["relative", "relative", "sticky", "sticky", "sticky"]}
            h="fit-content"
            top={[0, 0, 10, 10, 10]}
          >
            <HStack color={"green.600"} spacing={3}>
              <Icon as={BsMegaphone} fontSize="4xl" />
              <Heading>Aproveite</Heading>
            </HStack>
            <Text>Inscrições Abertas</Text>
            <Text color={"red.600"} fontWeight="bold">
              Inscrições até 20/05/2022
            </Text>
            <Text color={"red.600"} fontWeight="bold">
              Vagas Limitadas!!!
            </Text>
            <Stat mt={7} mb={7}>
              <StatLabel fontSize={"lg"}>Valor do Curso</StatLabel>
              <StatNumber fontSize={"4xl"}>R$ 100,00</StatNumber>
              <StatHelpText>Ou em 2x de R$ 50,00 no Cartão</StatHelpText>
            </Stat>
            <Link href="#inscricao" passHref>
              <Button
                leftIcon={<AiOutlineForm />}
                isFullWidth
                size="lg"
                colorScheme={"blue"}
              >
                Inscrever-se
              </Button>
            </Link>
          </Box>
        </Grid>
      </Container>

      <Container mt={10} maxW="6xl">
        <Flex justify={"center"} align="center" id="inscricao" mb={7}>
          <Box w="fit-content">
            <Heading>Inscreva-se</Heading>
            <Box
              w="100%"
              h="5px"
              bgGradient="linear(to-r, blue.200, blue.500)"
            />
          </Box>
        </Flex>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl isRequired>
              <FormLabel>Nome Completo</FormLabel>
              <Input name="name" />
            </FormControl>
            <Grid
              templateColumns={[
                "repeat(1, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
                "repeat(3, 1fr)",
              ]}
              gap={3}
            >
              <FormControl isRequired>
                <FormLabel>CPF</FormLabel>
                <ReactInputMask mask="999.999.999-99" name="cpf" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Whatsapp</FormLabel>
                <ReactInputMask mask="(99) 99999-9999" name="phone" />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input name="email" />
              </FormControl>
            </Grid>
            <Grid
              templateColumns={[
                "1fr",
                "1fr 3fr",
                "1fr 3fr",
                "1fr 3fr",
                "1fr 3fr",
              ]}
              gap={3}
            >
              <FormControl isRequired>
                <FormLabel>Período</FormLabel>
                <Select name="sala">
                  <option value={"Manhã"}>Manhã</option>
                  <option value={"Tarde"}>Tarde</option>
                  <option value={"Noite"}>Noite</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Informe uma Observação</FormLabel>
                <Input name="obs" />
              </FormControl>
            </Grid>

            <Flex align="center" gap={4}>
              <Button
                leftIcon={<AiOutlineSave />}
                colorScheme="blue"
                size="lg"
                type="submit"
                isLoading={loading}
              >
                Inscrever-me
              </Button>
              <Stat>
                <StatLabel>Você irá pagar:</StatLabel>
                <StatNumber>R$ 100,00</StatNumber>
              </Stat>
            </Flex>
          </Stack>
        </Form>
      </Container>

      <Box
        mt={10}
        bgGradient="linear(to-t, blue.300, blue.200)"
        p={10}
        id="sobre"
      >
        <Container maxW="6xl">
          <Heading>Sobre Nós</Heading>
          <Text>
            A NK Informática é uma Startup de desenvolvimento de sistemas web,
            mobile e desktop com sede em Pedro Afonso - TO, seu CEO é o Analista
            de Desenvolvimento de Sistemas (UNOPAR) Natanael Bezerra, com pouco
            mais de 3 anos atuando no mercado de desenvolvimento especificamente
            na região do estado do Tocantins, tem um portifólio de mais de 40
            projetos no{" "}
            <Link href={"https://github.com/nsbbezerra"} passHref>
              <ChakraLink
                color="blue.700"
                _hover={{ textDecor: "underline" }}
                target="_blank"
                fontWeight={"bold"}
              >
                GitHub
              </ChakraLink>
            </Link>
          </Text>
          <Text>
            Buscamos sempre nos atualizar para empregarmos em nossos projetos as
            melhores tecnologias do mercado, presando sempre pela segurança,
            rapidez e eficiência dos sistemas desenvolvidos, veja alguns dos
            nossos principais projetos:
          </Text>

          <Grid
            templateColumns={[
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={5}
            mt={5}
          >
            <Link href={"https://www.brazmultimidia.com.br/"} passHref>
              <ChakraLink target={"_blank"}>
                <Box rounded="md" overflow="hidden">
                  <Image
                    src="/img/braz.png"
                    objectFit="cover"
                    width={400}
                    height={270}
                    layout="responsive"
                    alt="Imagem NK Curso"
                    draggable={false}
                  />
                </Box>
                <Text>Braz Multimídia</Text>
              </ChakraLink>
            </Link>
            <Link href={"https://www.vchtrading.com/"} passHref>
              <ChakraLink target={"_blank"}>
                <Box rounded="md" overflow="hidden">
                  <Image
                    src="/img/vch.png"
                    objectFit="cover"
                    width={400}
                    height={270}
                    layout="responsive"
                    alt="Imagem NK Curso"
                    draggable={false}
                  />
                </Box>
                <Text>VCH Trading</Text>
              </ChakraLink>
            </Link>
            <Link href={"https://palmieriuniformes.com.br/"} passHref>
              <ChakraLink target={"_blank"}>
                <Box rounded="md" overflow="hidden">
                  <Image
                    src="/img/palmieri.png"
                    objectFit="cover"
                    width={400}
                    height={270}
                    layout="responsive"
                    alt="Imagem NK Curso"
                    draggable={false}
                  />
                </Box>
                <Text>Palmieri Uniformes</Text>
              </ChakraLink>
            </Link>
            <Link href={"https://santamariadotocantins.to.gov.br/"} passHref>
              <ChakraLink target={"_blank"}>
                <Box rounded="md" overflow="hidden">
                  <Image
                    src="/img/prefeitura.png"
                    objectFit="cover"
                    width={400}
                    height={270}
                    layout="responsive"
                    alt="Imagem NK Curso"
                    draggable={false}
                  />
                </Box>
                <Text>Prefeitura Santa Maria do Tocantins</Text>
              </ChakraLink>
            </Link>
          </Grid>

          <Flex
            pt={10}
            align="center"
            justify={"center"}
            textAlign="center"
            borderTopWidth={"1px"}
            mt={5}
            borderTopColor="blue.700"
          >
            © 2022 NK Informática - Todos os direitos reservados
          </Flex>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Home;
