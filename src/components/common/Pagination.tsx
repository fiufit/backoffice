import { Pagination as ReactPagination } from 'react-bootstrap';
import { useEffect, useState } from 'react';

interface PaginationProps {
    page: number,
    offset: number,
    nrows: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
}

export default function Pagination(props: PaginationProps) {
    const firstpage = 0;
    const lastPage = Math.ceil(props.nrows / props.offset) - 1;
    const [ currentPage, setCurrentPage ] = useState(props.page);

    const handlePageClick = (selectedPage: number) => {
        props.setPage(selectedPage);
        setCurrentPage(selectedPage);
    }

    const handlePreviousPageClick = () => {
        const previousPage = currentPage - 1;
        if (previousPage >= 0) {
            props.setPage(previousPage);
            setCurrentPage(previousPage);
        }
    }

    const handleNextPageClick = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= lastPage) {
            props.setPage(nextPage);
            setCurrentPage(nextPage);
        }
    }

    const handleFirstPageClick = () => {
        props.setPage(firstpage);
        setCurrentPage(firstpage);
    }

    const handleLastPageClick = () => {
        props.setPage(lastPage);
        setCurrentPage(lastPage);
    }

    return (
        <>
            {
                lastPage >= 0 ?
                <>
                    <hr className='me-3'/>
                    <div id="admin-edition-pagination" style={{'margin': '0px'}}>
                        <ReactPagination>
                            <ReactPagination.First onClick={handleFirstPageClick} />
                            <ReactPagination.Prev onClick={handlePreviousPageClick}/>
                            {
                                Array(lastPage + 1).fill(<></>).map((_, pageNumber) => {

                                    return (
                                        <ReactPagination.Item 
                                            key={pageNumber} 
                                            active={pageNumber === currentPage} 
                                            onClick={() => { handlePageClick(pageNumber) }}>
                                            {pageNumber + 1}
                                        </ReactPagination.Item>
                                    );
                                })
                            }
                            <ReactPagination.Next onClick={handleNextPageClick}/>
                            <ReactPagination.Last onClick={handleLastPageClick}/>
                        </ReactPagination>
                    </div>
                    <hr className='ms-3'/>
                </> : 
                <></>
            }    
        </>
    );
}
