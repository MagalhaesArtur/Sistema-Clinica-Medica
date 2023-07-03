import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef, Fragment } from "react";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar(props: {
  open: boolean;
  setOpen: Function;
  message?: string;
  color: AlertColor | undefined;
}) {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen(false);
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div>
      <Snackbar
        open={props.open}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={4000}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleClose}
          severity={props.color}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
