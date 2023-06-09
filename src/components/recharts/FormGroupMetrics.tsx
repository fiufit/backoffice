import { Form } from "react-bootstrap";

interface PropsFormGroupMetrics {
    title: string,
    value: number | string,
}

export default function FormGroupMetrics(props: PropsFormGroupMetrics) {
    return (
        <Form.Group className="mb-2">
            <Form.Label className="mb-0">{props.title}</Form.Label>
            <Form.Control type="text" disabled value={props.value} readOnly />
        </Form.Group>
    );
}