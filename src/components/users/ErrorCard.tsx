import { Card } from 'react-bootstrap';
import { BiError } from 'react-icons/bi';

interface Props {
    message: string,
}

export default function ErrorCard(props: Props) {
    const { message } = props;
    return (
        <Card className="h-100 text-center">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <BiError size={50} />
                <Card.Text className="fs-4">
                    {message}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}