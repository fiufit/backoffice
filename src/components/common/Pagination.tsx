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
        setCurrentPage(selectedPage);
        props.setPage(selectedPage);
    }

    const handlePreviousPageClick = () => {
        const previousPage = currentPage - 1;
        if (previousPage >= 0) {
            setCurrentPage(previousPage);
            props.setPage(previousPage);
        }
    }

    const handleNextPageClick = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= lastPage) {
            setCurrentPage(nextPage);
            props.setPage(nextPage);
        }
    }

    const handleFirstPageClick = () => {
        setCurrentPage(firstpage);
        props.setPage(firstpage);
    }

    const handleLastPageClick = () => {
        setCurrentPage(lastPage);
        props.setPage(lastPage);
    }

    useEffect(() => {
        setCurrentPage(props.page);
    }, [props.page])

    return (
        <>
            {
                lastPage >= 0 ?
                <>
                    <div id="admin-edition-pagination" className="pagination-edition mx-auto">
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
                </> : 
                <></>
            }    
        </>
    );
}
