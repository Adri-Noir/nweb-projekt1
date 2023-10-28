import React, { useCallback, useMemo } from "react";

export interface MUIMenuReturn {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
}

export default function useMUIMenu(): MUIMenuReturn {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return { anchorEl, open, handleOpen, handleClose };
}
