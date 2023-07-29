import { useRef } from "react";
import { useMutation } from "@apollo/client";

import {
  Modal,
  Button,
  Textarea,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { graphql } from "@/lib/gql";

const createCommentMutation = graphql(`
  mutation CreateReply($author_id: ID!, $post_id: ID!, $reply: String!) {
    createComment(author_id: $author_id, post_id: $post_id, reply: $reply) {
      id
    }
  }
`);

export default function CreateComment({
  postId,
  authorId,
  authorToken,
}: {
  postId: string;
  authorId: string;
  authorToken: string;
}) {
  const finalRef = useRef(null);
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createComment, { data, error, loading }] = useMutation(
    createCommentMutation,
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
    const reply = replyRef.current?.value ?? "";

    createComment({
      variables: { author_id: authorId, post_id: postId, reply: reply },
    });

    onClose();
  };

  return (
    <>
      <Button mt={4} onClick={onOpen} size={"xs"}>
        Comment
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Write a Reply</ModalHeader>
          <ModalCloseButton size="sm" />
          <ModalBody>
            <Textarea my={1} ref={replyRef} placeholder="Reply" />
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
