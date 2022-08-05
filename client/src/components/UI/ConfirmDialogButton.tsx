import { useState } from "react";
import { Button } from "react-bootstrap";
import ConfirmModalDialog from "./ConfirmModalDialog";

type Props = {
  bodyMessage: string | React.ReactNode;
  title: string | React.ReactNode;
  confirmBtnTitle: string | React.ReactNode;
  confirmBtnVariant?: string;
  className?: string;
  icon?: React.ReactNode;
  onConfirm: () => void;
};

const ConfirmDialogButton: React.FC<Props> = (props) => {
  const [isShowedDialog, setIsShowedDialog] = useState<boolean>(false);

  const hideDialogHandler = () => {
    setIsShowedDialog(false);
  };

  const showDialogHandler = () => {
    setIsShowedDialog(true);
  };

  return (
    <>
      <ConfirmModalDialog
        show={isShowedDialog}
        bodyMessage={props.bodyMessage}
        onHide={hideDialogHandler}
        title={props.title}
        onConfirm={props.onConfirm}
      />
      <Button
        variant={props.confirmBtnVariant ? props.confirmBtnVariant : "danger"}
        onClick={showDialogHandler}
        className={props.className}
      >
        {props.confirmBtnTitle}
      </Button>
    </>
  );
};

export default ConfirmDialogButton;
