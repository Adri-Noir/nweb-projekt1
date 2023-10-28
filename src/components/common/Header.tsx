import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import RenderWhen from "@/components/common/RenderWhen";
import useMUIMenu from "@/hooks/common/useMUIMenu";
import ProfileMenu from "@/components/common/ProfileMenu";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import AddCompetitionModal from "@/components/modules/competition/AddCompetitionModal";

const HEADER_HEIGHT = "60px";

const Header = () => {
  const session = useUser();
  const menu = useMUIMenu();
  const [openAddCompetitionModal, setOpenAddCompetitionModal] =
    React.useState(false);
  const handleOpenAddCompetitionModal = () => setOpenAddCompetitionModal(true);
  const handleCloseAddCompetitionModal = () =>
    setOpenAddCompetitionModal(false);

  return (
    <AppBar color={"primary"} position={"static"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"0.5rem"}
        height={HEADER_HEIGHT}
      >
        <div>
          <Typography variant={"h5"}> Tournament Frenzy </Typography>
        </div>
        {session?.user?.name && (
          <Stack direction={"row"} gap={"0.5rem"} alignItems={"center"}>
            <Box>
              <Tooltip title={"New Tournament"}>
                <IconButton
                  color={"secondary"}
                  onClick={handleOpenAddCompetitionModal}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <IconButton onClick={menu.handleOpen}>
              <Avatar
                alt={session?.user?.name}
                src={session?.user?.picture ?? ""}
              />
            </IconButton>
          </Stack>
        )}
        <RenderWhen condition={!session?.user && !session.isLoading}>
          <Button variant={"outlined"} color={"secondary"}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              href={"/api/auth/login"}
            >
              Login
            </Link>
          </Button>
        </RenderWhen>
        <RenderWhen condition={session.isLoading}>
          <CircularProgress color={"secondary"} />
        </RenderWhen>
      </Stack>
      <ProfileMenu {...menu} />
      <AddCompetitionModal
        open={openAddCompetitionModal}
        handleClose={handleCloseAddCompetitionModal}
      />
    </AppBar>
  );
};

export default Header;
