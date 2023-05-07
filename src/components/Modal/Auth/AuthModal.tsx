import React, { useEffect } from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";
type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const handleClose = () =>
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));

  // const currentUser = useRecoilValue(userState);
  const [user, error] = useAuthState(auth);

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
    <Modal isOpen={modalState.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" flexDirection="column" alignItems="center">
          {modalState.view === "login" && "Log In"}
          {modalState.view === "signup" && "Sign Up"}
          {modalState.view === "resetPassword" && "Reset Password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          pb={6}
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            width="70%"
          >
            {modalState.view === "login" || modalState.view === "signup" ? (
              <>
                <OAuthButtons />
                OR
                <AuthInputs />
              </>
            ) : (
              <ResetPassword />
            )}
            {/* // Will implement at end of tutorial */}
            {/* {user && !currentUser && (
                <>
                  <Spinner size="lg" mt={2} mb={2} />
                  <Text fontSize="8pt" textAlign="center" color="blue.500">
                    You are logged in. You will be redirected soon
                  </Text>
                </>
              )} */}
            {/* {false ? (
                <Flex
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                </Flex>
              ) : (
              )} */}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AuthModal;
