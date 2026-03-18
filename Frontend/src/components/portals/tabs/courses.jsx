import {
  Check,
  FilterXIcon,
  Image,
  Plus,
  PlusCircle,
  Search,
  Trash2,
  X,
} from "lucide-react";

export default function Courses() {
  const courses = [
    {
      name: "Computer Science 101",
      description: "Introduction to computer science concepts and programming.",
      code: "CS101",
      progress: 75,
      lecturer: "Dr. Smith",
      status: "Enrolled",
    },
    {
      name: "Mathematics 201",
      description:
        "Advanced topics in mathematics including calculus and linear algebra.",
      code: "MATH201",
      progress: 50,
      lecturer: "Prof. Johnson",
      status: "Enrolled",
    },
    {
      name: "Physics 301",
      description:
        "In-depth study of classical mechanics and electromagnetism.",
      code: "PHYS301",
      progress: 20,
      lecturer: "Dr. Lee",
      status: "Enrolled",
    },
    {
      name: "Chemistry 101",
      description: "Basic principles of chemistry and laboratory techniques.",
      code: "CHEM101",
      progress: 0,
      lecturer: "Dr. Brown",
      status: "Unenrolled",
    },
    {
      name: "Biology 201",
      description: "Study of cellular biology, genetics, and evolution.",
      code: "BIO201",
      progress: 100,
      lecturer: "Prof. Davis",
      status: "Completed",
    },
    {
      name: "History 101",
      description: "Overview of world history from ancient to modern times.",
      code: "HIST101",
      progress: 60,
      lecturer: "Dr. Wilson",
      status: "Enrolled",
    },
    {
      name: "Literature 201",
      description: "Analysis of classic and contemporary literary works.",
      code: "LIT201",
      progress: 30,
      lecturer: "Prof. Taylor",
      status: "Enrolled",
    },
    {
      name: "Art 101",
      description: "Introduction to art history and various art forms.",
      code: "ART101",
      progress: 90,
      lecturer: "Dr. Anderson",
      status: "Completed",
    },
    {
      name: "Economics 201",
      description: "Study of microeconomics and macroeconomics principles.",
      code: "ECON201",
      progress: 10,
      lecturer: "Prof. Thomas",
      status: "Enrolled",
    },
    {
      name: "Philosophy 101",
      description:
        "Introduction to philosophical thought and major philosophers.",
      code: "PHIL101",
      progress: 0,
      lecturer: "Dr. Martinez",
      status: "Unenrolled",
    },
    {
      name: "Psychology 201",
      description: "Study of human behavior, cognition, and mental processes.",
      code: "PSYCH201",
      progress: 80,
      lecturer: "Prof. Garcia",
      status: "Enrolled",
    },
    {
      name: "Sociology 101",
      description:
        "Examination of social structures, institutions, and interactions.",
      code: "SOC101",
      progress: 40,
      lecturer: "Dr. Rodriguez",
      status: "Enrolled",
    },
    {
      name: "Political Science 201",
      description:
        "Analysis of political systems, theories, and international relations.",
      code: "POLSCI201",
      progress: 70,
      lecturer: "Prof. Martinez",
      status: "Enrolled",
    },
    {
      name: "Environmental Science 101",
      description: "Study of environmental issues and sustainable practices.",
      code: "ENV101",
      progress: 50,
      lecturer: "Dr. Hernandez",
      status: "Enrolled",
    },
    {
      name: "Business 201",
      description:
        "Introduction to business principles and management strategies.",
      code: "BUS201",
      progress: 20,
      lecturer: "Prof. Clark",
      status: "Enrolled",
    },
    {
      name: "Engineering 101",
      description: "Overview of engineering disciplines and design processes.",
      code: "ENG101",
      progress: 0,
      lecturer: "Dr. Lewis",
      status: "Unenrolled",
    },
    {
      name: "Medicine 201",
      description: "Study of human anatomy, physiology, and medical practices.",
      code: "MED201",
      progress: 90,
      lecturer: "Prof. Walker",
      status: "Enrolled",
    },
    {
      name: "Law 101",
      description:
        "Introduction to legal systems, principles, and case studies.",
      code: "LAW101",
      progress: 60,
      lecturer: "Dr. Hall",
      status: "Enrolled",
    },
    {
      name: "Music 201",
      description: "Study of music theory, history, and performance.",
      code: "MUSIC201",
      progress: 30,
      lecturer: "Prof. Allen",
      status: "Unenrolled",
    },
    {
      name: "Theater 101",
      description: "Introduction to theater arts, acting, and production.",
      code: "THEATER101",
      progress: 80,
      lecturer: "Dr. Young",
      status: "Enrolled",
    },
    {
      name: "Computer Science 201",
      description:
        "Advanced programming concepts, data structures, and algorithms.",
      code: "CS201",
      progress: 50,
      lecturer: "Dr. Smith",
      status: "Enrolled",
    },
    {
      name: "Mathematics 301",
      description:
        "Specialized topics in mathematics such as topology and number theory.",
      code: "MATH301",
      progress: 20,
      lecturer: "Prof. Johnson",
      status: "Enrolled",
    },
    {
      name: "Physics 401",
      description:
        "Advanced study of quantum mechanics, relativity, and particle physics.",
      code: "PHYS401",
      progress: 0,
      lecturer: "Dr. Lee",
      status: "Unenrolled",
    },
    {
      name: "Chemistry 201",
      description:
        "In-depth study of organic chemistry, reactions, and synthesis.",
      code: "CHEM201",
      progress: 100,
      lecturer: "Dr. Brown",
      status: "Completed",
    },
    {
      name: "Biology 301",
      description:
        "Advanced topics in biology including molecular biology and ecology.",
      code: "BIO301",
      progress: 70,
      lecturer: "Prof. Davis",
      status: "Enrolled",
    },
  ];
  return (
    <div className="transition-all duration-600 bg-st-bg-m p-2 ">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold p-3">Your Courses</div>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-green-700 hover:text-white border rounded-xl transition-all duration-300 flex gap-0.5 items-center">
            <Plus size={16} />
            Enroll courses
          </button>
        </div>
      </div>
      <div className="rounded-xl bg-st-bg p-1 md:p-2 transition-all duration-600 w-full">
        <div className="flex justify-between border-b border-gray-400 pb-0.5">
          <div className="flex">
            <Search className="text-muted mt-1.5" />
            <input
              type="text"
              className="border-b focus:outline-none"
              placeholder="search"
            />
          </div>
          <div className="flex border border-gray-400 rounded-xl p-1 hover:bg-green-700 hover:text-white transition-all duration-300 items-center gap-0.5">
            <FilterXIcon />
            Filter
          </div>
        </div>
        <table className="overflow-x-auto w-full">
          <thead className="bg-st-bg-m transition-all duration-600">
            <tr>
              <th className="p-2 text-left">Course</th>
              <th className="p-2 ">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.code}>
                <td className="p-2 flex">
                  <div className="mr-2 hidden md:flex">
                    <Image className="h-full w-full" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{course.name}</div>
                    <div className="text-sm text-muted">{course.code}</div>
                    <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-muted">{course.lecturer}</div>
                    <div className="text-muted text-sm">
                      {course.description}
                    </div>
                  </div>
                </td>
                <td className="text-center pt-0">
                  <span
                    className={`text-sm p-1.5 rounded-xl mt-0 ${
                      course.status === "Completed"
                        ? "bg-green-200/10 text-green-800"
                        : course.status === "Enrolled"
                        ? "bg-blue-200/10 text-blue-800"
                        : "bg-red-200/10 text-red-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>
                <td className="text-left">
                  {course.status === "Completed" ? (
                    <button className="bg-green-500 text-white hover:bg-green-700 hover:scale-105 transition-all duration-300 flex items-center gap-0.5 p-1 rounded-xl">
                      <Check size={16} className="mt-1" />
                      <p className="ml-1">view</p>
                    </button>
                  ) : course.status === "Not Enrolled" ? (
                    <button className="bg-blue-700 text-white hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center gap-0.5 p-1 rounded-xl">
                      <PlusCircle size={16} className="mt-1" />
                      <p className="ml-1">Enroll</p>
                    </button>
                  ) : (
                    <button className="bg-red-500 text-white hover:bg-red-700 hover:scale-105 transition-all duration-300 flex items-center gap-0.5 p-1 rounded-xl">
                      <Trash2 size={16} className="mt-1" />
                      <p className="ml-1">drop</p>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
