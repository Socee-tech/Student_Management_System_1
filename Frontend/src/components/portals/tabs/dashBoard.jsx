import { ArrowRight, Filter, House, Link, Search } from "lucide-react";

export default function Dashboard({ setActiveTab }) {
  const courses = [
    { name: "Computer Science 101", code: "CS101", lecturer: "Dr. Smith" },
    { name: "Mathematics 201", code: "MATH201", lecturer: "Prof. Johnson" },
    { name: "Physics 301", code: "PHYS301", lecturer: "Dr. Lee" },
    { name: "Chemistry 101", code: "CHEM101", lecturer: "Dr. Brown" },
    { name: "Biology 201", code: "BIO201", lecturer: "Prof. Davis" },
  ];

  const grades = [
    {
      course: "Computer Science 101",
      grade: "A",
      year: "2025/2026",
      semester: 1,
    },
    { course: "Mathematics 201", grade: "B+", year: "2025/2026", semester: 1 },
    { course: "Physics 301", grade: "A-", year: "2025/2026", semester: 2 },
    { course: "Chemistry 101", grade: "B", year: "2025/2026", semester: 2 },
    { course: "Biology 201", grade: "A", year: "2025/2026", semester: 1 },
  ];

  const classes = [
    {
      name: "Computer Science 101",
      code: "CS101",
      lecturer: "Dr. Smith",
      time: "Mon 9:00 AM - 10:30 AM",
      hall: "Hall A",
    },
    {
      name: "Mathematics 201",
      code: "MATH201",
      lecturer: "Prof. Johnson",
      time: "Tue 11:00 AM - 12:30 PM",
      hall: "Hall B",
    },
    {
      name: "Physics 301",
      code: "PHYS301",
      lecturer: "Dr. Lee",
      time: "Wed 2:00 PM - 3:30 PM",
      hall: "Hall C",
    },
    {
      name: "Chemistry 101",
      code: "CHEM101",
      lecturer: "Dr. Brown",
      time: "Thu 9:00 AM - 10:30 AM",
      hall: "Hall D",
    },
    {
      name: "Biology 201",
      code: "BIO201",
      lecturer: "Prof. Davis",
      time: "Fri 11:00 AM - 12:30 PM",
      hall: "Hall E",
    },
  ];

  const notices = [
    {
      title: "Closure of portal",
      source: "Finance department",
      message:
        "All computer science students are expected to complete there fees by Mon 9th March 2026.",
    },
    {
      title: "New course available",
      source: "Academic office",
      message:
        "A new course on Artificial Intelligence has been added to the curriculum. Enroll now to secure your spot.",
    },
    {
      title: "Library hours extended",
      source: "Library",
      message:
        "The library will now be open until 10 PM on weekdays to accommodate students' study needs.",
    },
    {
      title: "Career fair next week",
      source: "Career services",
      message:
        "Don't miss the upcoming career fair on March 15th, where you can connect with top employers and explore internship opportunities.",
    },
    {
      title: "Maintenance downtime",
      source: "IT department",
      message:
        "The student portal will be undergoing maintenance on March 20th from 1 AM to 5 AM. Please plan accordingly.",
    },
  ];
  return (
    <div className="bg-st-bg-m text-sm md:text-base *:transition-all duration-600">
      <div className="relative rounded-3xl bg-st-bg-m/60 border border-gray-700 shadow-2xl p-8 overflow-hidden m-4">
        {/* glow 2 */}
        <div className="absolute -bottom-40 -left-5 w-80 h-60 bg-green-400 blur-3xl rounded-full" />
        {/* content */}
        <div className="relative z-10">
          <h4 className="text-2xl font-semibold mb-3">Welcome back Sospeter</h4>
          <p className="">
            It's nice to have you along. This is your portal, you can view your
            results,
          </p>
          <p>pay for your school fees, view your schedule and more.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:gap-12 gap-2 md:grid-cols-2 p-2 transition-all duration-600">
        <div className="bg-st-bg rounded-xl transition-all duration-600">
          <div className="flex justify-between p-3 border-b border-gray-400">
            <div className="text-xl font-semibold">Your Courses</div>
            <div className="flex space-x-0.5">
              <input
                type="text"
                className="rounded border-b focus:outline-none outline-none placeholder:text-gray-400"
                placeholder="search course"
              />
              <Search size={20} className="mt-2" />
              <p className="text-2xl">|</p>
              <Filter size={20} className="mt-2" />
            </div>
          </div>
          <table className="border-spacing-y-1 w-full p-3 mt-1 md:mt-4">
            <tbody>
              {courses.map((crs) => (
                <tr
                  key={crs.code}
                  className="odd:bg-gray-500 odd:text-white space-y-1"
                >
                  <td className="p-2">{crs.code}</td>
                  <td className="p-2">{crs.name}</td>
                  <td className="p-2">{crs.lecturer}</td>
                  <td className="hidden md:flex">
                    <button
                      onClick={() => setActiveTab("Courses")}
                      className="border border-gray-400 rounded hover:bg-green-700 transition-all duration-200 hover:text-white hover:scale-102 p-1 flex space-x-0.5 m-0.5"
                    >
                      View <Link size={15} className="pt-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="justify-center w-full flex mt-2">
            <div className="items-center space-x-4">
              <button
                onClick={() => setActiveTab("Courses")}
                className="border border-gray-500 p-2 rounded hover:bg-green-700 hover:text-white transition-all duration-300"
              >
                View more
              </button>
              <button className="border border-gray-500 p-2 rounded bg-green-700 text-white hover:bg-green-950 transition-all duration-300">
                Enroll course
              </button>
            </div>
          </div>
        </div>
        <div className="bg-st-bg rounded-xl transition-all duration-600">
          <div className="flex justify-between p-3 border-b border-gray-400">
            <div className="text-xl font-semibold">Your Grades</div>
            <div className="flex space-x-0.5">
              <input
                type="text"
                className="rounded border-b focus:outline-none outline-none placeholder:text-gray-400"
                placeholder="search course"
              />
              <Search size={20} className="mt-2" />
              <p className="text-2xl">|</p>
              <Filter size={20} className="mt-2" />
            </div>
          </div>
          <table className="w-full mt-1 md:mt-4">
            <tbody className="">
              {grades.map((grade) => (
                <tr
                  key={grade.course}
                  className="odd:bg-gray-500 odd:text-white space-y-1"
                >
                  <td className="p-2">{grade.course}</td>
                  <td className="p-2">{grade.grade}</td>
                  <td className="p-2">{grade.year}</td>
                  <td className="p-2">Sem {grade.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="justify-center w-full flex mt-2">
            <div className="items-center space-x-4">
              <button
                onClick={() => setActiveTab("Grades")}
                className="border border-gray-500 p-2 rounded hover:bg-green-700 hover:text-white transition-all duration-300"
              >
                View more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:gap-12 gap-2 md:grid-cols-3 p-2">
        <div>
          <div className="flex justify-between p-3 border-b border-gray-400">
            <div className="text-xl font-semibold">Classes today</div>
            <button
              onClick={() => setActiveTab("Classes")}
              className="rounded flex p-1 hover:bg-green-700 justify-between hover:text-white transition-all duration-300"
            >
              View more
              <ArrowRight />
            </button>
          </div>
          <div className="bg-st-bg rounded-xl transition-all duration-600 mt-1 md:mt-4 p-3">
            {classes.map((classItem) => (
              <div
                key={classItem.code}
                className="bg-st-bg-m rounded-2xl p-2 transition-all duration-600 mb-2 border border-gray-500"
              >
                <h3 className="font-semibold">{classItem.name}</h3>
                <p className="text-sm text-muted">
                  {classItem.code} - {classItem.lecturer}
                </p>
                <div className="flex space-x-1">
                  <div className="bg-green-700 rounded-full p-2 text-white">
                    <House size={20} />
                  </div>
                  <div className="">
                    <p className="text-sm">{classItem.hall}</p>
                    <p className="text-muted font-light text-sm">
                      {classItem.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex justify-between p-3 border-b border-gray-400">
            <div className="text-2xl font-semibold">NOTICES...</div>
            <button
              onClick={() => setActiveTab("Notices")}
              className="rounded flex p-1 hover:bg-green-700 justify-between hover:text-white transition-all duration-300"
            >
              View more
              <ArrowRight />
            </button>
          </div>
          <div className="bg-st-bg rounded-xl transition-all duration-600 mt-1 md:mt-4 p-3">
            {notices.map((notice) => (
              <div
                key={notice.message}
                className="bg-st-bg-m rounded-2xl p-2 transition-all duration-600 mb-2 border border-gray-500"
              >
                <h3 className="font-semibold border-b text-base text-green-500">
                  {notice.title}
                </h3>
                <p className="text-muted text-sm">{notice.source}</p>
                <section className="mt-3">{notice.message}</section>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
