import { useState } from "react";
import { Button } from "react-bootstrap";

import ConfirmModalDialog from "./ConfirmModalDialog";

type Props = {
  headerTitle?: string;
  title?: string;
  onDelete: () => void;
  className?: string;
};

const DeleteDialogButton: React.FC<Props> = (props) => {
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
        headerTitle={
          props.headerTitle ? props.headerTitle : "Potvrdenie vymazania topiku"
        }
        onHide={hideDialogHandler}
        title={props.title ? props.title : "Naozaj chcete vymazať tento topik?"}
        onConfirm={props.onDelete}
      />
      <Button variant="danger" onClick={showDialogHandler} className={props.className ? props.className : "ms-2"} >
        Vymazať
      </Button>
    </>
  );
};

export default DeleteDialogButton;
