import { Accordion } from "react-bootstrap";

export default function MetricsTrainings() {
    return (
        <div className="metrics-accordion">
            <Accordion className='pt-2'> { /* defaultActiveKey="metrics-trainings" */ }
                <Accordion.Item eventKey="metrics-trainings" className="metrics-item">
                    <Accordion.Header>Entrenamientos</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ligula interdum, placerat urna non, pellentesque orci. Nullam aliquam id justo et dictum. Aliquam erat volutpat. In iaculis ultrices arcu posuere tempor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque accumsan nibh a accumsan varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris iaculis efficitur felis at molestie. Nullam eu nisl nec enim pellentesque iaculis ac vel lectus. Vivamus ut nisl vel purus pellentesque tincidunt. Nulla interdum justo diam, ut dignissim diam mattis ac. Proin vulputate, lorem ut cursus pellentesque, turpis nibh elementum quam, vitae porttitor felis odio quis metus.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}