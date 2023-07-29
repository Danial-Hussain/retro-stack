"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Text, Container, Input, Button, useToast } from "@chakra-ui/react";

import { graphql } from "@/lib/gql";
import { useUser } from "@/lib/recoil/user";
import { useMutation } from "@apollo/client";

const query = graphql(`
  mutation Registration(
    $email: String!
    $username: String!
    $password: String!
  ) {
    register(email: $email, username: $username, password: $password) {
      id
      remember_token
    }
  }
`);

export default function RegistrationForm() {
  const toast = useToast();
  const router = useRouter();
  const [_, setUser] = useUser();
  const [register, { loading, data, error }] = useMutation(query);

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";
    const username = usernameRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    register({
      variables: { username: username, password: password, email: email },
    });
  };

  useEffect(() => {
    if (data) {
      let { id, remember_token } = data["register"];
      if (!remember_token) return;
      setUser({ id: id, token: remember_token });

      toast({
        description: "Signed In",
        duration: 3000,
        isClosable: true,
        status: "success",
      });

      router.push("/");
    }
  }, [data]);

  return (
    <Container maxW={"sm"}>
      <Text fontFamily={"heading"} fontWeight={"bold"} fontSize={24}>
        Register
      </Text>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Input placeholder="Username" my={1.5} ref={usernameRef} />
        <Input placeholder="Email" my={1.5} ref={emailRef} />
        <Input placeholder="Password" my={1.5} ref={passwordRef} />
        <Button
          my={1.5}
          type="submit"
          width={"full"}
          colorScheme="blue"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
        <Text textAlign={"center"} fontSize={"sm"} color={"red.500"}>
          {error && "Failed to create account"}
        </Text>
      </form>
    </Container>
  );
}
