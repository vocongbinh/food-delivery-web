import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ConfirmRemoveDialog({
  children,
  isOpen,
  title,
  handleConfirm,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  handleConfirm: () => void;
  
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (isOpen) {
    setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <div onClick={handleClickOpen}>
        {children}
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <span className="flex items-center gap-2">
          <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
          Confirmation Dialog
          </span>
          
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography gutterBottom>
            {title}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            <span className="text-neutral-200 dark:text-white">Cancel</span>
          </Button>
          <Button className="text-red-500" onClick={async() => {
            handleConfirm();
            handleClose();
          }}>
            Confirm
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
