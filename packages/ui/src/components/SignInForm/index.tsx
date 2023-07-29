"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Text, Container, Input, Button, useToast } from "@chakra-ui/react";

import { graphql } from "@/lib/gql";
import { useUser } from "@/lib/recoil/user";
import { useMutation } from "@apollo/client";

const query = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      remember_token
    }
  }
`);

export default function SignInForm() {
  const toast = useToast();
  const router = useRouter();
  const [_, setUser] = useUser();
  const [login, { loading, data, error }] = useMutation(query);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    login({
      variables: { email: email, password: password },
    });
  };

  useEffect(() => {
    if (data) {
      let { id, remember_token } = data["login"];
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
        Sign In
      </Text>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Input placeholder="Email" my={1.5} ref={emailRef} />
        <Input placeholder="Password" my={1.5} ref={passwordRef} />
        <Button type="submit" width={"full"} my={1.5} colorScheme="blue">
          {loading ? "Loading..." : "Submit"}
        </Button>
        <Text textAlign={"center"} fontSize={"sm"} color={"red.500"}>
          {error && "Failed to sign in"}
        </Text>
      </form>
    </Container>
  );
}
