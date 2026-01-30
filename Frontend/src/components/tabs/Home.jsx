import { useEffect, useState } from "react";
import StatCard from "../statCard";
import {
  Users,
  BookOpen,
  Presentation,
  BookOpenCheck,
  UserCheck,
  SchoolIcon,
  GraduationCap,
  Pen,
  Book,
  School2Icon,
  Users2,
  DollarSign,
  Layers,
  TrendingUp,
} from "lucide-react";
import API from "../../API/axios";
import UseNotify from "../../../snackBar/snackBar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
export default function Home({ isMenuOpen }) {
  const { notifyError } = UseNotify();
  const [count, setCount] = useState({ studNo: "", lectNo: "", courseNo: "" });
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const countStudent = await API.get("/students/count");
        if (countStudent && countStudent.data) {
          setCount((prev) => ({ ...prev, studNo: countStudent.data.count }));
        }
        const countLecturer = await API.get("/lecturers/count");
        if (countLecturer && countLecturer.data) {
          setCount((prev) => ({ ...prev, lectNo: countLecturer.data.count }));
        }
        const countCourse = await API.get("/courses/count");
        if (countCourse && countCourse.data) {
          setCount((prev) => ({ ...prev, courseNo: countCourse.data.count }));
        }
      } catch (error) {
        console.error("Error fetching student count:", error);
        notifyError("Failed to fetch student count");
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-col lg:flex-row sm:items-center sm:justify-between gap-2">
        <div className="h-fill">
          <div className="card-header p-6 space-y-8 flex-1 items-center w-full dark:text-white">
            <div className="flex justify-between items-center">
              <SchoolIcon className="w-16 h-16" />
              <GraduationCap className="w-16 h-16" />
            </div>
            <div className="flex space-x-3">
              <Pen /> <Book /> <School2Icon />
            </div>
            <h2 className="text-xl font-semibold">
              "Transforming lives through quality education"
            </h2>
          </div>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1 w-full">
          <StatCard
            title="students"
            value={count.studNo}
            icon={Users}
            onClick={isMenuOpen}
          />
          <StatCard
            title="lecturers"
            value={count.lectNo}
            icon={Users2}
            onClick={isMenuOpen}
          />
          <StatCard
            title="courses"
            value={count.courseNo}
            icon={Presentation}
            onClick={isMenuOpen}
          />
          <StatCard title="Active classes" value="42" icon={BookOpenCheck} />
          <StatCard title="Attendance Today" value="92%" icon={UserCheck} />
          <StatCard title="Debtors" value="500" icon={DollarSign} />
          <StatCard title="Courses" value="267" icon={BookOpen} />
          <StatCard title="Departments" value="20" icon={Layers} />
          <StatCard title="Performance" value="70%" icon={TrendingUp} />
        </section>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 min-h-[12rem] gap-4">
        <div>
          <PieChartDefaultIndex />
        </div>
        <div style={{ width: "100%", height: "350px" }}>
          <CustomizeLabels />
        </div>
        <div style={{ width: "100%", height: "350px" }}>
          <Step1 />
        </div>
      </section>
    </div>
  );
}

function Step1() {
  return (
    <div style={{ width: "100%", maxWidth: 500, height: 300, margin: "auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const data = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 300, pv: 4567, amt: 2400 },
  { name: "Mar", uv: 320, pv: 1398, amt: 2400 },
  { name: "Apr", uv: 200, pv: 9800, amt: 2400 },
  { name: "May", uv: 278, pv: 3908, amt: 2400 },
  { name: "Jun", uv: 189, pv: 4800, amt: 2400 },
];

const margin = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 25,
};

const formatAxisTick = (value) => {
  return `*${value}*`;
};

const renderCustomBarLabel = ({ x, y, width, value }) => {
  return (
    <text
      x={x + width / 2}
      y={y}
      fill="#666"
      textAnchor="middle"
      dy={-6}
    >{`value: ${value}`}</text>
  );
};

function CustomizeLabels() {
  return (
    <div style={{ width: "100%", maxWidth: 600, margin: "auto" }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={margin}>
          <XAxis
            dataKey="name"
            tickFormatter={formatAxisTick}
            label={{
              position: "insideBottomRight",
              value: "Months",
              offset: -10,
            }}
          />
          <YAxis
            label={{
              position: "insideTopLeft",
              value: "Values",
              angle: -90,
              dy: 60,
            }}
          />
          <Bar dataKey="uv" fill="#8884d8" label={renderCustomBarLabel} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function PieChartDefaultIndex({ isAnimationActive = true }) {
  return (
    <div style={{ width: "100%", maxWidth: 400, height: 400, margin: "auto" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeShape={{ fill: "red" }}
            data={[
              { name: "Page A", uv: 590 },
              { name: "Page B", uv: 590 },
              { name: "Page C", uv: 868 },
            ]}
            dataKey="uv"
            isAnimationActive={isAnimationActive}
          />
          <Tooltip defaultIndex={2} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
