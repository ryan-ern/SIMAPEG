import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const data = useSelector((state) => state.store.info)
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState('');
    
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDate = `${getDayOfWeek(now)}, ${now.getDate()} ${getMonthName(now)} ${now.getFullYear()}`;
            setDate(formattedDate);
            setTime(now.toLocaleTimeString());
        };
        const interval = setInterval(updateDateTime, 1000);
        updateDateTime();
        return () => clearInterval(interval);
    }, []);

    const getDayOfWeek = (date) => {
        const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        return daysOfWeek[date.getDay()];
    };

    const getMonthName = (date) => {
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return months[date.getMonth()];
    };

    return (
        <Row style={{ background: '#093545' }}>
            <Row>
                <Row className="text-white mb-4">
                    <Col xs={12} md={8}>
                        <h2 className="text-capitalize">Halo, {data.name}!</h2>
                    </Col>
                    <Col xs={12} md={4} className="text-end mt-2">
                        <h2 className="text-start text-md-end">{time}</h2>
                        <h5 className="text-start text-md-end">{date}</h5>
                    </Col>
                </Row>
                {data.role === 'admin' ?
                    <Row>
                        <Col lg={6} xs={12} className="mb-5">
                            <Card >
                                <Card.Body>
                                    Total Absen
                                    <span className="form-control text-white mb-3 mt-4 p-3" style={{ background: '#105c77' }}>Tepat Waktu</span>
                                    <span className="form-control text-white mb-3  p-3" style={{ background: '#105c77' }}>Terlambat</span>
                                    <span className="form-control text-white  p-3" style={{ background: '#105c77' }}>Cuti</span>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={6} xs={12}>
                            <Card style={{ background: '#105c77' }}>
                                <Card.Body>
                                    <span className="text-white text-capitalize">data hari ini</span>
                                    <div className="form-control mb-3 mt-4 p-3 text-capitalize">
                                        <FontAwesomeIcon icon="fa-solid fa-users" style={{ color: "#2073fe", }} />
                                        <span className="mx-2">
                                            jumlah karyawan
                                        </span>
                                    </div>
                                    <div className="form-control mb-3 p-3 text-capitalize">
                                        <FontAwesomeIcon icon="fa-solid fa-users" style={{ color: "#24e220", }} />
                                        <span className="mx-2">
                                            karyawan hadir
                                        </span>
                                    </div>
                                    <div className="form-control mb-3  p-3 text-capitalize">
                                        <FontAwesomeIcon icon="fa-solid fa-users" style={{ color: "#ff2c2c", }} />
                                        <span className="mx-2">
                                            karyawan telat
                                        </span>
                                    </div>
                                    <div className="form-control mb-3  p-3 text-capitalize">
                                        <FontAwesomeIcon icon="fa-solid fa-users" style={{ color: "#ff8a00", }} />
                                        <span className="mx-2">
                                            karyawan cuti
                                        </span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    :
                    <Row>
                        <Col lg={6} xs={12} className="mb-5">
                            <Card >
                                <Card.Body>
                                    Total Absen
                                    <span className="form-control text-white mb-3 mt-4 p-3" style={{ background: '#105c77' }}>Tepat Waktu</span>
                                    <span className="form-control text-white mb-3  p-3" style={{ background: '#105c77' }}>Terlambat</span>
                                    <span className="form-control text-white  p-3" style={{ background: '#105c77' }}>Cuti</span>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={6} xs={12} className="mb-5">
                            <Card style={{ background: '#105c77' }}>
                                <Card.Body>
                                    <span className="text-white">Pintasan</span>
                                    <div>
                                        <Button variant="light" className="form-control mt-4 mb-3">Absen Masuk</Button>
                                    </div>
                                    <div>
                                        <Button variant="light" className="form-control mb-3">Absen Masuk</Button>
                                    </div>
                                    <div>
                                        <Button variant="light" className="form-control mb-3">Pengajuan Cuti</Button>
                                    </div>
                                    <div>
                                        <Button variant="light" className="form-control">Lihat Gaji</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                }
            </Row>
        </Row>
    )
}