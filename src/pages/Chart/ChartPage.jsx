
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./ChartPage.module.css"
import { Container, Row, Col } from "react-bootstrap";
import AgeChart from "./Charts/AgeChart";
import GenderChart from "./Charts/GenderChart";
import BodyTypeChart from "./Charts/BodyTypeChart";
import UsageChart from "./Charts/UsageChart";
import { useEffect, useState } from "react";
import { caxios } from "../../config/config";

const ChartPage = () => {
    const [ageValues, setAgeValues] = useState([0, 0, 0, 0, 0]);
    const [genderValues, setGenderValues] = useState([0, 0]); // 남/여
    const [bodyTypeValues, setBodyTypeValues] = useState([0, 0, 0]); // 예시
    const [usageValues, setUsageValues] = useState([0, 0, 0, 0, 0, 0, 0]); // 시간대 등


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await caxios.get("/chart"); // 서버에서 데이터 가져오기
                // 서버에서 데이터 구조에 맞게 가공
                console.log(res);
                setAgeValues(res.data.age);
                setGenderValues(res.data.gender);
                setBodyTypeValues(res.data.bodyType);
                setUsageValues(res.data.usage);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={6} className={styles.manage_layout}>
                    <AgeChart values={ageValues} />
                </Col>
                <Col xs={12} md={6} className={styles.manage_layout}>
                    <GenderChart values={genderValues} />
                </Col>
                <Col xs={12} md={6} className={styles.manage_layout}>
                    <BodyTypeChart values={bodyTypeValues} />
                </Col>
                <Col xs={12} md={6} className={styles.manage_layout}>
                    <UsageChart values={usageValues} />
                </Col>
            </Row>
        </Container>
    );
};

export default ChartPage;
