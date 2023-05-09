import { Post } from "@/atoms/postAtom";
import { firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { Alert, AlertIcon, AlertTitle, Flex, Icon } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import ImageUploads from "./PostForm/ImageUpload";
import TextInputs from "./PostForm/TextInputs";
import TabItem from "./TabItem";

type NewPostProps = {
  user: User;
  communityImageURL?: string;
};

const formTabs: TabItemType[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItemType = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostProps> = ({ user, communityImageURL }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const handleCreatePost = async () => {
    const { communityId } = router.query;
    //create new post obj
    const newPost: Post = {
      communityId: communityId as string,
      communityImageURL: communityImageURL || "",
      creatorId: user?.uid,
      creatorDisplayName: user.displayName
        ? user.displayName
        : user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    setLoading(true);
    try {
      // store the post to db
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      // check for selected file
      if (selectedFile) {
        // store in storage => getDownloadURL(return imageURL)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      router.back();
    } catch (error) {
      console.log("handleCreatePost error", error);
      setError(true);
    }
    setLoading(false);
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item, i) => (
          <React.Fragment key={i}>
            <TabItem
              item={item}
              selected={item.title === selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </React.Fragment>
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUploads
            selectedFile={selectedFile}
            setSelectedTab={setSelectedTab}
            onSelectImage={onSelectFile}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error creating post!</AlertTitle>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
