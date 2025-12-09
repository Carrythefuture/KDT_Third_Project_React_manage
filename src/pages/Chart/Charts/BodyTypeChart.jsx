import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./ChartStyle.module.css";
import { color } from "chart.js/helpers";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const bodyTypeMap = {
  A: "A-삼각형",
  V: "V-역삼각형",
  H: "H-직사각형",
  O: "O-원형",
  X: "X-모래시계형",
  none: "미설정"
};

export default function BodyTypeChart({ values }) {
  const labels = ["A", "V","H", "O","X", "none"];
  const map = new Map();

  values.forEach(item => map.set(item.LABEL, item.CNT));

  const dataValues = labels.map(label => map.get(label) || 0);


  const mappedLabels = labels.map(label => bodyTypeMap[label] || label);
  


  const data = {
    labels: mappedLabels,
    datasets: [
      {
        label: "명",

        data: dataValues,
        backgroundColor: [
          'rgba(255, 186, 201, 1)',
          'rgba(255, 214, 173, 1)',
          'rgba(255, 239, 202, 1)',
          'rgba(221, 255, 255, 1)',
          'rgba(191, 230, 255, 1)',
          'rgba(126, 208, 255, 1)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgba(151, 214, 255, 1)',
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
        text: '체형 타입',
        color: '#2a2a2aff', // 제목 글씨 검정색
        font: { size: 18, color: "black" },
      },
      legend: {
        display: false,
      
      },
       datalabels: {
        anchor: 'end',     // 라벨 위치
        // align: 'mid',      // 막대 위쪽에 표시
        color: 'rgba(56, 56, 56, 1)',
        
      },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} className={styles.border} />;
}
