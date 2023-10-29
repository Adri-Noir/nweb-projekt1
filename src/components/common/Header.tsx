import React, { ChangeEvent, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputBase,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import RenderWhen from "@/components/common/RenderWhen";
import useMUIMenu from "@/hooks/common/useMUIMenu";
import ProfileMenu from "@/components/common/ProfileMenu";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import AddCompetitionModal from "@/components/modules/competition/AddCompetitionModal";
import SearchIcon from "@mui/icons-material/Search";

const HEADER_HEIGHT = "60px";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export interface IHeaderProps {
  refetchData?: () => void;
  searchFn?: (value: string) => void;
}

const Header = ({ refetchData, searchFn }: IHeaderProps) => {
  const session = useUser();
  const menu = useMUIMenu();
  const [openAddCompetitionModal, setOpenAddCompetitionModal] =
    React.useState(false);
  const handleOpenAddCompetitionModal = () => setOpenAddCompetitionModal(true);
  const handleCloseAddCompetitionModal = () => {
    if (refetchData) refetchData();
    setOpenAddCompetitionModal(false);
  };
  const [searchValue, setSearchValue] = useState("");
  const handleOnSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <AppBar color={"primary"} position={"static"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={"0.5rem"}
        height={HEADER_HEIGHT}
      >
        <Box>
          <Stack direction={"row"} alignItems={"center"} gap={"1rem"}>
            <Link
              href={"/"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant={"h5"}> Tournament Frenzy </Typography>
            </Link>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={handleOnSearchValueChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") searchFn?.(searchValue);
                }}
              />
            </Search>
          </Stack>
        </Box>
        {session?.user?.name && (
          <Stack direction={"row"} gap={"0.5rem"} alignItems={"center"}>
            <Box>
              <Tooltip title={"New Competition"}>
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
              style={{ color: "inherit", textDecoration: "none" }}
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
