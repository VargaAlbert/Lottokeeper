import { useLottoContext, TICKET_PRICE } from "../../../contextAPI/LottoContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
    handleClose: () => void;
    show: boolean;
    id: string;
}

const TicketModal: React.FC<Props> = ({ handleClose, show, id }) => {


    const {
        getMoney,
        formatPrice
    } = useLottoContext();

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nincs elegendő egyenlege!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sajnáljuk de nem tud több lottó szelvényt feladni mert nincs elegendő egyenlege.
                    <div className="pt-4 fs-4 fw-bold">
                        Játék ára: {TICKET_PRICE} Akcse
                    </div>
                    <div className="pt-1 fs-4 fw-bold">
                        Egyenlege: <span className="text-danger">{formatPrice(getMoney(id))}</span>
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

export default TicketModal;