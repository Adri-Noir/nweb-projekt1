import { MUIMenuReturn } from "@/hooks/common/useMUIMenu";
import React from "react";
import {
  Button,
  Divider,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  styled,
} from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

type ProfileMenuProps = MUIMenuReturn;

const MenuWithoutPadding = styled(Menu)(({ theme }) => ({
  padding: 0,
  "& .MuiMenu-list": {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const MenuItemWithoutHover = styled(MenuItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&:focus": {
    cursor: "default",
  },
}));

const ProfileMenu = (props: ProfileMenuProps) => {
  const { user } = useUser();

  return (
    <MenuWithoutPadding
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
    >
      <Paper sx={{ width: 220 }}>
        <MenuList dense>
          <MenuItem>
            <ListItemText>{user?.nickname}</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItemWithoutHover disableRipple>
            <Button variant={"outlined"} color={"primary"}>
              <Link href={"/api/auth/logout"}>Logout</Link>
            </Button>
          </MenuItemWithoutHover>
        </MenuList>
      </Paper>
    </MenuWithoutPadding>
  );
};

export default ProfileMenu;
