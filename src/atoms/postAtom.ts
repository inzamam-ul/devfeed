import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number | null;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
};

export type PostVote = {
  id?: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

interface postState {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
}

const defaultPostState: postState = {
  selectedPost: null,
  postVotes: [],
  posts: [],
};

export const postState = atom({
  key: "postState",
  default: defaultPostState,
});
