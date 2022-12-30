import styles from "@css/Charts.module.scss";
import Chart from "./AreaChart";
import BarCharrt from "./BarCharrt";
import ComposedCharrt from "./Composed";

const data1 = [
  {
    name: "A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const composed = [
  {
    "name": "A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

const bardata = [
  {
    name: "A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "G",
    uv: 3490,
    pv: 4300,
  },
];

export default function Charts() {
  return (
    <div className={styles.charts_container}>
      <div className={styles.grid}>
        <Chart data={data1} />
        <ComposedCharrt data={composed} />
        <BarCharrt data={bardata} />
      </div>
    </div>
  );
}
