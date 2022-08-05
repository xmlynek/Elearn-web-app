import { Modal, Button } from "react-bootstrap";

type Props = {
  className?: string;
  title: string;
  headerTitle: string;
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
};

const ConfirmModalDialog: React.FC<Props> = (props) => {
  return (
    <Modal
      className={props.className}
      show={props.show}
      onHide={props.onHide}
      backdrop={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{props.headerTitle}</h5>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onConfirm}>Potvrdiť</Button>
        <Button onClick={props.onHide}>Zrušiť</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModalDialog;
