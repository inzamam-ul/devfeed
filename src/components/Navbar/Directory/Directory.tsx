import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { MdOutlineLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { TiGroupOutline, TiHome } from "react-icons/ti";
import { useSetRecoilState } from "recoil";
import Communities from "./Communities";
import useDirectory from "@/hooks/useDirectory";

const Directory: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor="pointer"
        padding="0px 0px"
        borderRadius={3}
        ml={{ base: 3, md: 3 }}
        mr={2}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align="center">
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                borderRadius="full"
                boxSize="24px"
                src={directoryState.selectedMenuItem.imageURL}
                mr={2}
              />
            ) : (
              <Icon
                as={TiGroupOutline}
                color="white"
                bg="blue.400"
                rounded="full"
                p="3px"
                fontSize={24}
                mr={{ base: 1, md: 1 }}
              />
            )}

            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600} fontSize="10pt">
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
