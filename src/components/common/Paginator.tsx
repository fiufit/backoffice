import Pagination from 'react-bootstrap/Pagination';

function getPaginationLimits(pageActive: number, maxPages: number): [number, number] {

    if (pageActive < 1) return [1, 1];

    const cantBeforPages = 5;
    const cantAfterPages = 4;

    let startNumber = pageActive - cantBeforPages;
    let endNumber = pageActive + cantAfterPages;
    let startNumberValid = true;
    let endNumberValid = true;

    do {

        if (startNumber < 1) {

            startNumberValid = false;
            startNumber++;
            endNumber++;

        } else {
            startNumberValid = true;
        }

    } while (!startNumberValid);
    
    do {

        if (endNumber > maxPages) {
            endNumberValid = false;
            endNumber--;
            if ((startNumber - 1) >= 1) { startNumber--; }
        } else {
            endNumberValid = true;
        }

    } while (!endNumberValid)

    return [startNumber, endNumber];
}

interface PaginatorProps {

    setPageActiveWrapper: Function,
    pageActive: number,
    totalPages: number,

}


export default function Paginator(props: PaginatorProps) {
    
    const { pageActive, totalPages, setPageActiveWrapper } = props;
    const [paginationStart, paginationEnd] = getPaginationLimits(pageActive, totalPages);
    
    let items = [
        <Pagination.Item onClick={() => setPageActiveWrapper(1)}> {"«"} </Pagination.Item>,
        <Pagination.Item onClick={() => setPageActiveWrapper((pageActive > 1) ? (pageActive - 1) : 1)}> {"‹"} </Pagination.Item>
    ];

    for (let number = paginationStart; number <= paginationEnd; number++) {

        items.push(
            <Pagination.Item key={number} active={number === pageActive} onClick={() => setPageActiveWrapper(number)}> {number} </Pagination.Item>,
        );
    }

    items.push(
        <Pagination.Item onClick={() => setPageActiveWrapper((pageActive < totalPages) ? (pageActive + 1) : totalPages)}> {"›"} </Pagination.Item>        
    );
    items.push(
        <Pagination.Item onClick={() => setPageActiveWrapper(totalPages)}> {"»"} </Pagination.Item>
    );
    
    return (<Pagination>{items}</Pagination>);


}