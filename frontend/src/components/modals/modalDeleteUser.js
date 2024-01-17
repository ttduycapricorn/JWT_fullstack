import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDeleteUser(props) {
    return (
        <>
            <Modal show={props.show} onHide={props.onHide} style={{ color: 'black' }} centered>
                <Modal.Header>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Are you sure delete {props.dataModal.email}?</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;
