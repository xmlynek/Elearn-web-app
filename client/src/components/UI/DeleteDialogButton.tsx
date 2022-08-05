import { useState } from 'react';
import { Button } from 'react-bootstrap';
import useLangTranslation from '../../hooks/useLangTranslation';

import ConfirmModalDialog from './ConfirmModalDialog';

type Props = {
  headerTitle?: string | React.ReactNode;
  title?: string | React.ReactNode;
  onDelete: () => void;
  className?: string;
};

const DeleteDialogButton: React.FC<Props> = (props) => {
  const [isShowedDialog, setIsShowedDialog] = useState<boolean>(false);
  const translations = useLangTranslation();

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
        bodyMessage={
          props.headerTitle ? props.headerTitle : 'Potvrdenie vymazania topiku'
        }
        onHide={hideDialogHandler}
        title={props.title ? props.title : 'Naozaj chcete vymazať tento topik?'}
        onConfirm={props.onDelete}
      />
      <Button
        variant="danger"
        onClick={showDialogHandler}
        className={props.className ? props.className : 'ms-2'}
      >
        {translations?.deleteLabel}
      </Button>
    </>
  );
};

export default DeleteDialogButton;
