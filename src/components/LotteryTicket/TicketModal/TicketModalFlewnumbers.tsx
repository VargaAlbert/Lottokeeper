import { useLottoContext, LOTTERY_NUMBER } from "../../../contextAPI/LottoContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
    handleClose: () => void;
    show: boolean;
    tipp: number;
}

const TicketModalFlewnumbers: React.FC<Props> = ({ handleClose, show, tipp }) => {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kevés tipp!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="pt-4 fs-5 fw-bold">
                        Érvényes szelvényhez {LOTTERY_NUMBER} tippet kell megadnia!
                    </div>
                    <div className="pt-4 fs-4 fw-bold">
                        Tippeljen még: {LOTTERY_NUMBER - tipp} db
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-success" variant="secondary" onClick={handleClose}>
                        Bezár
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TicketModalFlewnumbers;