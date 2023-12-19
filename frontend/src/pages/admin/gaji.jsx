import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMessage, getSalary, updateSalary } from "../../store/saga/actions"
import { Card, CardBody, Col, Row, Toast, ToastContainer } from "react-bootstrap"
import {
    useTable, useSortBy, useGlobalFilter, usePagination,
} from 'react-table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Gaji() {
    const diambil = ({
        status: 'diambil'
    })
    const belumdiambil = ({
        status: 'belum diambil'
    })

    const dispatch = useDispatch()
    const gaji = useSelector((state) => state.store.salary)
    const message = useSelector((state) => state.store)

    useEffect(() => {
        dispatch(getSalary()) 
    }, [])
    
    useEffect(() => {
        if (message && message.delete?.message || message.add?.message || message.edit?.message) {
            setShow(true);
            setTimeout(() => {
                dispatch(deleteMessage());
            }, 3000);
        }
    }, [message.delete, message.edit])
    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: (_, index) => index + 1
            },
            {
                Header: 'Nama',
                accessor: 'name',
                Cell: ({value}) => (value)
            },
            {
                Header: 'Total Absen',
                accessor: 'total_presence',
                Cell: ({value}) => (value),
            },
            {
                Header: 'Total Gaji',
                accessor: 'total_salary',
                Cell: ({value}) => (value),
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({value}) => (value),
            },
            {
                Header: 'Aksi',
                id: 'actions',
                disableSortBy: true,
                Cell: ({ row }) => (
                    <>
                        <div className='text-center'>
                            
                            <button className="btn btn-primary px-4 my-3" disabled={row.original.presence_out==="-"} onClick={(e) => {
                                e.preventDefault();
                                dispatch(updateSalary(row.original.id, diambil ));
                            }}
                            >Diambil</button>
                        </div>
                        <div className='text-center'>
                            <button className="btn btn-danger px-2" disabled={row.original.presence_out==="-"} onClick={(e) => {
                                e.preventDefault();
                                dispatch(updateSalary(row.original.id, belumdiambil));
                            }}>Belum Diambil</button>
                        </div>
                    </>
                ),
            },
        ],
        [],
    )

    const data = useMemo(
        () => (gaji?.salary_list || []),
        [gaji],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
        gotoPage,
        pageCount,
    } = useTable(
        {
            columns,
            data,
            initialState:{
                pageSize:5,
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    )
    const [show, setShow] = useState(false)
    const { globalFilter } = state

    return (
        <Row style={{ marginRight: '5%' }}>
            {show && (
                <ToastContainer position="top-end" style={{ zIndex: 5, position: 'absolute' }}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} style={{ width: '100%', marginTop: '45%', marginLeft: '2%' }} autohide>
                        <Toast.Header style={{ background: '#22bb55' }}>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto p-2 text-white">
                                <FontAwesomeIcon icon="fa-solid fa-check" className="mx-2" />
                                {message.delete?.message || message.add?.message || message.edit?.message}
                            </strong>
                        </Toast.Header>
                    </Toast>
                </ToastContainer>
            )
            }
            <Col className='my-5'>
                <Card className="overflow-hidden p-4 border-0 shadow-lg rounded-4">
                    <CardBody>
                        <Row className="mb-2">
                            <Col >
                                <div className="mb-2 d-inline-block">
                                    <div className="position-relative">
                                        <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari data gaji" className="form-control" style={{ backgroundColor: '#f3f6f9' }} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='table-responsive'>
                                    <table {...getTableProps()} className='table align-middle table-nowrap table-hover'>
                                        <thead className='text-center'>
                                            {headerGroups.map((headerGroup) => (
                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                    {headerGroup.headers.map((column) => {
                                                        const sortIcon = column.isSortedDesc ? "🔼": "🔽";
                                                        return (
                                                            <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{backgroundColor:'#f3f6f9'}}>
                                                                {column.render('Header')}
                                                                <span>{column.isSorted ? sortIcon : ''}</span>
                                                            </th>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </thead>
                                        {page.length === 0 ? (
                                            <tbody >
                                                <tr>
                                                    <td colSpan={headerGroups[0].headers.length} className="text-center">
                                                        {(gaji) ? 'Tidak ada data.' : null}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ) : (
                                            <tbody {...getTableBodyProps()} className='text-center'>
                                                {page.map((row) => {
                                                    prepareRow(row);
                                                    return (
                                                        <tr {...row.getRowProps()}>
                                                            {row.cells.map((cell) => (
                                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                            ))}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </Col>
                        </Row>
                        <Row className="align-items-md-center mt-3">
                            <Col>
                                <nav aria-label="Page navigation">
                                    <ul className="pagination pagination-sm justify-content-end mb-2">
                                        {/* First */}
                                        <li className={`page-item ${state.pageIndex === 0 ? 'hide-pagination' : ''}`}>
                                            <a className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(0)} tabIndex="-1">
                                                {'<<'}
                                            </a>
                                        </li>
                                        {/* Previus */}
                                        <li className={`page-item ${state.pageIndex === 0 ? 'hide-pagination' : ''}`}>
                                            <a className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(state.pageIndex - 1)} tabIndex="-1">{'<'}</a>
                                        </li>
                                        {Array.from({ length: pageCount }, (_, index) => index + 1).map((key, index) => (
                                            <li key={key} className={`page-item ${index === state.pageIndex ? 'active' : ''}`}>
                                                <a className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(index)}>{index + 1}</a>
                                            </li>
                                        ))}
                                        {/* Next */}
                                        <li className={`page-item ${state.pageIndex === pageCount - 1 ? 'hide-pagination' : ''}`}>
                                            <a className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(state.pageIndex + 1)}>{'>'}</a>
                                        </li>
                                        {/* Last */}
                                        <li className={`page-item ${state.pageIndex === pageCount - 1 ? 'hide-pagination' : ''}`}>
                                            <a className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(pageCount - 1)}>
                                                {">>"}
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}