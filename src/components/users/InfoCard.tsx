import { Card } from 'react-bootstrap';
import { BiInfoCircle } from 'react-icons/bi';

interface Props {
    message: string,
}

export default function InfoCard(props: Props) {
    const { message } = props;
    return (
        <Card className="h-100 text-center">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <BiInfoCircle size={50} />
                <Card.Text className="fs-4">
                    {message}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}