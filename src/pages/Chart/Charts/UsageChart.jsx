// LineChart.jsx
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./ChartStyle.module.css";
import { color } from "chart.js/helpers";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function UsageChart({ values }) {
    const dataValues = values.map(values => values.CNT);

    const data = {
        labels: [
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
            "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
        ],
        datasets: [
            {
                label: "접속시간",
                data: dataValues,
                borderWidth: 2,
                tension: 0.4, // 곡선
                pointRadius: 8,
                pointBackgroundColor: 'rgba(255, 52, 52, 1)', // 포인트 내부 색
                borderColor: 'rgba(255, 52, 52, 1)',
                pointColor: 'green'
            },
        ],
    };

    const options = {
        responsive: true, // 부모 컨테이너 크기에 따라 차트 크기 자동 조절
        maintainAspectRatio: false, // true면 가로/세로 비율 유지, false면 자유롭게 높이/폭 조절

        plugins: {
            legend: { display: false }, // 범례 글씨 검정},

            title: {
                display: true,
                text: '접속시간대',
                color: '#2a2a2aff', // 제목 글씨 검정색
                font: { size: 18, color: "black" },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} className={styles.border} />;
}