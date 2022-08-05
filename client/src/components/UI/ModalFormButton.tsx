import { useState } from "react";
import { Button } from "react-bootstrap";
import ModalLayout from "../Layout/ModalLayout";

type Props = {
  btnVariant?: string;
  modalTitle: string | React.ReactNode;
  btnTitle: string | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  callbackFunc?: Function;
};

const ModalFormButton: React.FC<Props> = (props) => {
  const [isShownEditForm, setIsShownEditForm] = useState<boolean>(false);

  const showEditFormHandler = () => {
    setIsShownEditForm(true);
  };

  const hideEditFormHandler = () => {
    setIsShownEditForm(false);
  };

  const callbackHandler = props.callbackFunc
    ? () => {
        if (props.callbackFunc) {
          props.callbackFunc();
          hideEditFormHandler();
        }
      }
    : () => {
      hideEditFormHandler();
      };

  return (
    <>
      <ModalLayout
        title={props.modalTitle}
        backdropType={"static"}
        show={isShownEditForm}
        onHide={callbackHandler}
      >
        {props.children}
      </ModalLayout>
      <Button
        className={props.className}
        variant={`${props.btnVariant ? props.btnVariant : "primary"}`}
        onClick={showEditFormHandler}
      >
        {props.btnTitle}
        {props.icon ? <span className="ms-1">{props.icon}</span> : null}
      </Button>
    </>
  );
};

export default ModalFormButton;
