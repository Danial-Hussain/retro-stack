import { useRef } from "react";
import { useMutation } from "@apollo/client";

import {
  Modal,
  Button,
  Textarea,
  Input,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { graphql } from "@/lib/gql";

const createPostMutation = graphql(`
  mutation CreatePost($author_id: ID!, $title: String!, $content: String!) {
    createPost(author_id: $author_id, title: $title, content: $content) {
      id
    }
  }
`);

export default function CreatePost({
  authorId,
  authorToken,
}: {
  authorId: string;
  authorToken: string;
}) {
  const finalRef = useRef(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createPost, { data, error, loading }] = useMutation(
    createPostMutation,
    {
      context: {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authorToken}`,
        },
      },
    }
  );

  const handleCreate = () => {
    const title = titleRef.current?.value ?? "";
    const content = contentRef.current?.value ?? "";

    createPost({
      variables: { author_id: authorId, title: title, content: content },
    });

    onClose();
  };

  return (
    <>
      <Button mt={4} onClick={onOpen} size={"sm"}>
        Create Post
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Post</ModalHeader>
          <ModalCloseButton size="sm" />
          <ModalBody>
            <Input my={1} ref={titleRef} placeholder="Post Title" />
            <Textarea my={1} ref={contentRef} placeholder="Post Content" />
            <Button
              my={1}
              width={"full"}
              colorScheme="blue"
              onClick={handleCreate}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
