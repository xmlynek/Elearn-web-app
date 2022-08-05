import OptionIcon from '../../assets/icons/OptionsIcon';
import useLangTranslation from '../../hooks/useLangTranslation';
import ModalFormButton from './ModalFormButton';

type Props = {
  modalTitle: string | React.ReactNode;
  className?: string;
  btnTitle?: string | React.ReactNode;
};

const UpdateModalFormButton: React.FC<Props> = (props) => {
  const translations = useLangTranslation();

  return (
    <ModalFormButton
      btnTitle={props.btnTitle ? props.btnTitle : translations?.updateLabel}
      modalTitle={props.modalTitle}
      btnVariant="warning"
      icon={<OptionIcon />}
      className={props.className ? props.className : 'me-md-2'}
    >
      {props.children}
    </ModalFormButton>
  );
};

export default UpdateModalFormButton;
