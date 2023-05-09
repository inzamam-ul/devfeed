import { Community } from "@/atoms/communitiesAtom";
import { Post as Posts } from "@/atoms/postAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type PostProps = {
  communityData: Community;
};

const Posts: React.FC<PostProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePosts();
  const getPosts = async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Posts[],
      }));
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, [communityData]);
  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue?.posts?.map((item) => (
            <PostItem
              key={item.id}
              post={item}
              userVoteValue={
                postStateValue?.postVotes?.find(
                  (vote) => vote.postId === item.id
                )?.voteValue ?? 0
              }
              userIsCreator={user?.uid === item.creatorId}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              onVote={onVote}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
