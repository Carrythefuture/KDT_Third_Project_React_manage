// PieChart.jsx
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import styles from "./ChartStyle.module.css";

ChartJS.register(ArcElement, Tooltip, Legend); //차트에서 필요한 기능 꺼내쓰는 코드.

const genderMap = {
    male: "남자",
    female: "여자",
    none: "미설정"
};


export default function GenderChart({ values }) {
    const labels = ["male", "female", "none"];
    const map = new Map();

    values.forEach(item => map.set(item.GENDER, item.CNT));

    const dataValues = labels.map(label => map.get(label) || 0);

    const filteredLabels = labels.filter((_, i) => dataValues[i] > 0);

    const mappedLabels = filteredLabels.map(label => genderMap[label] || label);
    const filteredData = dataValues.filter(value => value > 0);

    const data = {
        labels: mappedLabels,
        datasets: [
            {
                data: filteredData,
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 186, 201, 1)',
                    'rgba(255, 214, 173, 1)',
                    'rgba(255, 239, 202, 1)'
                ],
                borderColor: [
                     'rgba(255, 186, 201, 1)',
                    'rgba(255, 214, 173, 1)',
                    'rgba(255, 239, 202, 1)'
                ],
            },
        ],
    };

    const options = {
        responsive: true, // 부모 컨테이너 크기에 따라 차트 크기 자동 조절
        maintainAspectRatio: false, // true면 가로/세로 비율 유지, false면 자유롭게 높이/폭 조절

        plugins: {
            title: {
                display: true,
                text: '성별 분포',
                color: '#2a2a2aff', // 제목 글씨 검정색
                font: { size: 18, color: "black" },
            },
            legend: {
                position: "right",
                onClick: null
            },
            datalabels: {
                color: 'rgba(56, 56, 56, 1)',
                font: { size: 12 },
                formatter: (value, context) => {
                    const dataset = context.chart.data.datasets[0].data;
                    const total = dataset.reduce((sum, val) => sum + val, 0);
                    const percentage = ((value / total) * 100).toFixed(1) + "%";
                    return percentage; // 각 조각 위에 퍼센트 표시
                },
            },
        },
    };

    return <Pie data={data} options={options} className={styles.border} />;
}