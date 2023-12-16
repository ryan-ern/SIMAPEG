import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
    const [outletMargin, setOutletMargin] = useState('0');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ overflowX: 'hidden' }}>
            <Row>
                <Col>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Sidebar setOutletMargin={setOutletMargin} />
                </Col>
                <Col xs={10}>
                    <div
                        className='mb-5 mt-5 align-items-center'
                        style={{
                            minHeight: '80vh',
                            marginLeft: outletMargin,
                            transition: 'margin-left 0.3s ease',
                        }}
                    >
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
