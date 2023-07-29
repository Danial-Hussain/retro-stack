"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { Box, HStack, Button, Divider, useToast } from "@chakra-ui/react";

import { graphql } from "@/lib/gql";
import { useUser } from "@/lib/recoil/user";

const query = graphql(`
  mutation Logout {
    logout
  }
`);

export default function Navigation() {
  const toast = useToast();
  const router = useRouter();
  const [user, _, removeUser] = useUser();
  const [signout, { data, loading, error }] = useMutation(query, {
    context: {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    },
  });

  const handleSignOut = async () => {
    signout();
    removeUser();
    toast({
      description: "Successfully signed out",
      duration: 3000,
      isClosable: true,
      status: "success",
    });
    router.push("/");
  };

  return (
    <Box width={"full"}>
      {!user.token ? (
        <Box>
          <HStack py={2} justifyContent={"center"}>
            <Link href={"/signin"}>
              <Button mx={1} variant={"outline"} size={"sm"}>
                Sign In
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button mx={1} variant={"outline"} size={"sm"}>
                Register
              </Button>
            </Link>
          </HStack>
        </Box>
      ) : (
        <HStack py={2} justifyContent={"center"}>
          <Link href={"/"}>
            <Button mx={1} variant={"outline"} size={"sm"}>
              Home
            </Button>
          </Link>
          <Button
            mx={1}
            size={"sm"}
            variant={"outline"}
            onClick={handleSignOut}
          >
            {loading ? "Loading..." : "Sign Out"}
          </Button>
        </HStack>
      )}
      <Divider mb={8} />
    </Box>
  );
}
