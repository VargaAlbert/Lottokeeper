import { useLottoContext, LOTTERY_NUMBER } from "../../../contextAPI/LottoContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
    handleClose: () => void;
    show: boolean;
    lotteryNumbersLength: number;
}

const TicketModalFewnumbers: React.FC<Props> = ({ handleClose, show, lotteryNumbersLength }) => {

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="user-select-none">
                <Modal.Header closeButton>
                    <Modal.Title>Kevés tipp!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Érvényes szelvényhez {LOTTERY_NUMBER}db tippet kell megadnia!
                    <div className="pt-4 fs-4 fw-bold">
                        Még {LOTTERY_NUMBER - lotteryNumbersLength} tippeljen.
                    </div>
                    <div className="pt-1 fs-4 fw-bold">

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-success" variant="secondary" onClick={handleClose}>
                        Értettem
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TicketModalFewnumbers;