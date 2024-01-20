import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDeleteUser(props) {
    const handlePressEnter = (event) => {
        if (event.charCode === 13 || event.code === 'Enter') {
            props.handleDelete();
        }
    };
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                style={{ color: 'black' }}
                centered
                onKeyUp={(event) => handlePressEnter(event)}
            >
                <Modal.Body>
                    <h3>Are you sure delete this user: {props.dataModal.email}?</h3>
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
