import { Modal } from 'react-bootstrap';
import useLangTranslation from '../../hooks/useLangTranslation';

type Props = {
  className?: string;
  title: string | React.ReactNode;
  show: boolean;
  onHide: () => void;
  backdropType?: string;
};

const ModalLayout: React.FC<Props> = (props) => {
  const translations = useLangTranslation();

  return (
    <div>
      <Modal
        className={props.className}
        show={props.show}
        onHide={props.onHide}
        size={'lg'}
        backdrop={props.backdropType === 'static' ? 'static' : true}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{translations?.modalLayoutBodyLabel}</h5>
          {props.children}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalLayout;
