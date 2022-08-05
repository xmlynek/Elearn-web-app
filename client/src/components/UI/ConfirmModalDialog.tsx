import { Modal, Button } from 'react-bootstrap';
import useLangTranslation from '../../hooks/useLangTranslation';

type Props = {
  className?: string;
  title: string | React.ReactNode;
  bodyMessage: string | React.ReactNode;
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
};

const ConfirmModalDialog: React.FC<Props> = (props) => {
  const translations = useLangTranslation();

  return (
    <Modal
      className={props.className}
      show={props.show}
      onHide={props.onHide}
      backdrop={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{props.bodyMessage}</h5>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onConfirm}>{translations?.confirmLabel}</Button>
        <Button onClick={props.onHide}>{translations?.cancelLabel}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModalDialog;
