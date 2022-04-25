import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import {
  AiOutlineAlert,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import Lottie from "react-lottie";
import finishAnimation from "../animations/finish.json";
import { useRouter } from "next/router";
import { FaDiscord } from "react-icons/fa";
import { configs } from "../configs";

const Finish: NextPage = () => {
  const { query, push } = useRouter();
  const { status } = query;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: finishAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (status === "null" || status === null) {
      push("/");
    }
  }, [status, push]);

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

      <Container mt={10} maxW="5xl">
        <Flex
          justify={"center"}
          align="center"
          direction={"column"}
          borderWidth="1px"
          rounded="md"
          p={5}
          mb={10}
          bg={
            (status === "pending" && "yellow.100") ||
            (status === "approved" && "green.100") ||
            (status === "rejected" && "red.100") ||
            ""
          }
        >
          {status === "pending" && (
            <>
              <Flex
                gap={3}
                align="center"
                justify={"center"}
                direction={["column", "row", "row", "row", "row"]}
                color={"yellow.600"}
              >
                <Icon as={AiOutlineAlert} fontSize="3xl" />
                <Heading fontSize="3xl" textAlign={"center"}>
                  Aguardando o Pagamento
                </Heading>
              </Flex>

              <Text textAlign={"center"} mt={5}>
                {" "}
                Após o seu pagamento o sistema identificará automaticamente o
                processo, clique na{" "}
                <Link href={"/"} passHref>
                  <a className="text-sky-200 font-bold hover:underline">
                    Página Inicial
                  </a>
                </Link>{" "}
                no botão <strong>MINHA INSCRIÇÃO</strong> para ver o status da
                inscrição. Aproveite e entre na nossa comunidade no{" "}
                <Link href={configs.discord} passHref>
                  <ChakraLink target={"_blank"} _hover={{ textDecor: "none" }}>
                    <Button
                      leftIcon={<FaDiscord />}
                      colorScheme="purple"
                      size="xs"
                      mx={2}
                    >
                      Discord
                    </Button>
                  </ChakraLink>
                </Link>{" "}
                ou nos envie uma mensagem no{" "}
                <Link href={`https://wa.me/${configs.whatsapp}`} passHref>
                  <a target={"_blank"}>
                    <Button
                      leftIcon={<AiOutlineWhatsApp />}
                      colorScheme="whatsapp"
                      size="xs"
                      mx={2}
                    >
                      Whatsapp
                    </Button>
                  </a>
                </Link>
                para ficar por dentro das novidades, dos horários das aulas e
                das turmas. Aproveite para ir tirando as dúvidas com o Professor
                Natanael Bezerra sobre todas as atividades do curso.
              </Text>
            </>
          )}
          {status === "approved" && (
            <>
              <Flex
                gap={3}
                align="center"
                justify={"center"}
                direction={["column", "row", "row", "row", "row"]}
                color={"green.600"}
              >
                <Icon as={AiOutlineCheck} fontSize="3xl" />
                <Heading fontSize="3xl" textAlign={"center"}>
                  Inscrição Confirmada
                </Heading>
              </Flex>

              <Text textAlign={"center"} mt={5}>
                {" "}
                Agora entre na nossa comunidade no{" "}
                <Link href={configs.discord} passHref>
                  <ChakraLink target={"_blank"} _hover={{ textDecor: "none" }}>
                    <Button
                      leftIcon={<FaDiscord />}
                      colorScheme="purple"
                      size="xs"
                      mx={2}
                    >
                      Discord
                    </Button>
                  </ChakraLink>
                </Link>{" "}
                ou nos envie uma mensagem no{" "}
                <Link href={`https://wa.me/${configs.whatsapp}`} passHref>
                  <a target={"_blank"}>
                    <Button
                      leftIcon={<AiOutlineWhatsApp />}
                      colorScheme="whatsapp"
                      size="xs"
                      mx={2}
                    >
                      Whatsapp
                    </Button>
                  </a>
                </Link>
                para ficar por dentro das novidades, dos horários das aulas e
                das turmas. Aproveite para ir tirando as dúvidas com o Professor
                Natanael Bezerra sobre todas as atividades do curso.
              </Text>
            </>
          )}
          {status === "rejected" && (
            <>
              <Flex
                gap={3}
                align="center"
                justify={"center"}
                direction={["column", "row", "row", "row", "row"]}
                color={"red.600"}
              >
                <Icon as={AiOutlineClose} fontSize="3xl" />
                <Heading fontSize="3xl" textAlign={"center"}>
                  Pagamento Rejeitado
                </Heading>
              </Flex>

              <Text textAlign={"center"} mt={5}>
                Ops! Seu pagamento por algum motivo foi rejeitado, vá até a{" "}
                <Link href={"/"} passHref>
                  <ChakraLink color={"blue.500"}>Página Inicial</ChakraLink>
                </Link>{" "}
                no botão <strong>MINHA INSCRIÇÃO</strong> para ver o status da
                inscrição e tentar efetuar o pagamento novamente. Aproveite e
                entre na nossa comunidade no{" "}
                <Link href={configs.discord} passHref>
                  <ChakraLink target={"_blank"} _hover={{ textDecor: "none" }}>
                    <Button
                      leftIcon={<FaDiscord />}
                      colorScheme="purple"
                      size="xs"
                      mx={2}
                    >
                      Discord
                    </Button>
                  </ChakraLink>
                </Link>
                , caso esteja enfrentando algum problema com o pagamento entre
                em contato conosco através do{" "}
                <Link href={`https://wa.me/${configs.whatsapp}`} passHref>
                  <a target={"_blank"}>
                    <Button
                      leftIcon={<AiOutlineWhatsApp />}
                      colorScheme="whatsapp"
                      size="xs"
                      mx={2}
                    >
                      Whatsapp
                    </Button>
                  </a>
                </Link>
                . Aproveite para ir tirando as dúvidas com o Professor Natanael
                Bezerra sobre todas as atividades do curso.
              </Text>
            </>
          )}
        </Flex>
      </Container>
    </Fragment>
  );
};

export default Finish;
