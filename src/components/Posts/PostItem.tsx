import { Post } from "@/atoms/postAtom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue: number;
  onVote: () => {};
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userVoteValue,
  userIsCreator,
  onDeletePost,
  onSelectPost,
  onVote,
}) => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleDeletePost = async () => {
    setLoading(true);
    try {
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Delete post failed");
      }
      console.log("Post deleted");
    } catch (error: any) {
      setError(error.message);
      console.log("handleDeletePost error", error.message);
    }
    setLoading(false);
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      onClick={onSelectPost}
    >
      <Flex
        direction="column"
        align="center"
        p={2}
        bg="gray.100"
        width="40px"
        borderRadius={4}
      >
        <Icon
          fontSize={18}
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          cursor="pointer"
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          fontSize={18}
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          cursor="pointer"
        />
      </Flex>
      <Flex direction="column" width="100%">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <Stack spacing={1} p="10px">
          <Stack direction="row" spacing={0.6} fontSize="9pt" align="center">
            <Text fontSize="9pt" color="gray.500">
              Posted by {post.creatorDisplayName}{" "}
              {moment(post.createdAt?.seconds * 1000).fromNow()}
            </Text>
          </Stack>
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" width="100%" p={2}>
              <Image
                priority={true}
                src={post.imageURL}
                alt="post image"
                height={460}
                width={460}
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDeletePost}
            >
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
