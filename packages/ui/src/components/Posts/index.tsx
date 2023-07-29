"use client";

import CreateComment from "@/components/CreateComment";
import CreatePost from "@/components/CreatePost";
import { graphql } from "@/lib/gql";
import { useUser } from "@/lib/recoil/user";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { LockIcon } from "@chakra-ui/icons";
import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";

const getPostsQuery = graphql(`
  query GetPosts {
    posts {
      id
      title
      content
      created_at
      author {
        name
        username
      }
      comments {
        id
        reply
        author {
          name
          username
        }
      }
    }
  }
`);

export default function Posts() {
  const [user] = useUser();

  const { data, error } = useSuspenseQuery(getPostsQuery, {
    errorPolicy: "all",
    context: {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    },
  });

  if (!user.token) {
    return (
      <Box>
        <Center>
          <VStack>
            <LockIcon width={16} height={16} />
            <Text maxW={"2xs"} textAlign={"center"}>
              You must be signed in to access the home page
            </Text>
          </VStack>
        </Center>
      </Box>
    );
  }

  return (
    <Box>
      <Box maxW={"2xl"} mx={"auto"}>
        <HStack justifyContent={"space-between"}>
          <Text fontWeight={"bold"} fontSize={"3xl"} fontFamily={"heading"}>
            Posts
          </Text>
          <CreatePost authorId={user.id ?? ""} authorToken={user.token ?? ""} />
        </HStack>
        <VStack mt={8}>
          {data &&
            data.posts.map((post) => (
              <Box
                key={post.id}
                p={2}
                width={"full"}
                border={"1px"}
                borderRadius={"lg"}
                borderColor={"gray.200"}
              >
                <Text color={"gray.400"}>@{post.author.username}</Text>
                <Text>{post.content}</Text>
                <CreateComment
                  postId={post.id}
                  authorId={user.id ?? ""}
                  authorToken={user.token ?? ""}
                />
                <VStack mt={4} mr={24}>
                  {post.comments.map((comment) => (
                    <Box
                      p={3}
                      width={"full"}
                      key={comment.id}
                      borderRadius={"2xl"}
                      background={"gray.50"}
                    >
                      <Text fontSize={"2xs"} color={"gray.400"}>
                        @{post.author.username}
                      </Text>
                      <Text fontSize={"xs"}>{post.content}</Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            ))}
        </VStack>
      </Box>
    </Box>
  );
}
