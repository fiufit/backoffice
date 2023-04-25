import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectCreateAdminModal } from '@state/createAdminModal';
import { close } from '@state/createAdminModal';
import Modal from 'react-bootstrap/Modal';
import CreateAdminForm from './home/CreateAdminForm';

export default function CreateAdminModal() {
  const state = useAppSelector(selectCreateAdminModal);
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(close());

  return (
    <>
      <Modal
        show={state.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Crear Administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateAdminForm />
        </Modal.Body>
      </Modal>
    </>
  );
}
