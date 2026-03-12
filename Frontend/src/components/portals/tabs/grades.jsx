import {
  FilterIcon,
  GalleryVerticalEnd,
  Search,
  Tally1,
  Tally5Icon,
} from "lucide-react";

export default function Grades() {
  const grades = [
    {
      course: "Computer Science 101",
      grade: "A",
      credits: 3,
      semester: "1",
      year: 2023,
      lecturer: "Dr. Smith",
    },
    {
      course: "Mathematics 201",
      grade: "B",
      credits: 4,
      semester: "1",
      year: 2023,
      lecturer: "Prof. Johnson",
    },
    {
      course: "Physics 301",
      grade: "A",
      credits: 3,
      semester: "2",
      year: 2023,
      lecturer: "Dr. Lee",
    },
    {
      course: "Chemistry 101",
      grade: "C",
      credits: 4,
      semester: "2",
      year: 2023,
      lecturer: "Dr. Brown",
    },
    {
      course: "Biology 201",
      grade: "A",
      credits: 3,
      semester: "1",
      year: 2024,
      lecturer: "Prof. Davis",
    },
    {
      course: "History 101",
      grade: "B",
      credits: 4,
      semester: "1",
      year: 2024,
      lecturer: "Dr. Wilson",
    },
    {
      course: "Literature 201",
      grade: "A",
      credits: 3,
      semester: "2",
      year: 2024,
      lecturer: "Prof. Taylor",
    },
    {
      course: "Art 101",
      grade: "A",
      credits: 2,
      semester: "2",
      year: 2024,
      lecturer: "Dr. Anderson",
    },
    {
      course: "Philosophy 101",
      grade: "B",
      credits: 3,
      semester: "1",
      year: 2025,
      lecturer: "Dr. Martinez",
    },
    {
      course: "Economics 201",
      grade: "A",
      credits: 4,
      semester: "1",
      year: 2025,
      lecturer: "Prof. Garcia",
    },
    {
      course: "Psychology 301",
      grade: "B",
      credits: 3,
      semester: "2",
      year: 2025,
      lecturer: "Dr. Rodriguez",
    },
  ];
  const grader = [
    { grade: "A" },
    { grade: "B" },
    { grade: "C" },
    { grade: "D" },
    { grade: "F" },
  ];
  return (
    <div className="p-1">
      <div className="flex justify-between border-b mb-1">
        <h3 className="text-xl font-semibold">Your Grades</h3>
        <button className="flex items-center gap-1 text-sm font-medium text-muted mr-2">
          <FilterIcon className="hover:cursor-pointer" />
          <p>Filter</p>
        </button>
      </div>
      <div className="flex items-center bg-gray-500 w-full border rounded-lg p-1 mb-2">
        <Search className="ml-2 mt-1 text-muted" />
        <input
          type="text"
          className="rounded p-1 focus:outline-none bg-transparent w-full"
          placeholder={`search Grade`}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
        <div className="rounded-2xl bg-st-bg p-2">
          <div className="flex justify-between">
            <p className="">Total grades</p>
            <div className="bg-blue-400/30 rounded-xl p-1">
              <GalleryVerticalEnd />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <p className="text-2xl font-semibold">3.8</p>
          </div>
        </div>
        {grader.map((grade) => (
          <div
            className={`rounded-2xl bg-st-bg p-2 ${
              grades.filter((g) => g.grade === grade.grade).length === 0 &&
              "hidden"
            }`}
          >
            <div className="flex justify-between">
              <p className="fonr-light">Grade</p>
              <div
                className={` text-white rounded font-bold pr-1 pl-1 ${
                  grade.grade == "A"
                    ? "bg-green-400/50"
                    : grade.grade == "B"
                    ? "bg-blue-400/50"
                    : grade.grade == "C"
                    ? "bg-amber-300/50"
                    : grade.grade == "D"
                    ? "bg-gray-500"
                    : "bg-red-400/50"
                }`}
              >
                {grade.grade}
              </div>
            </div>
            <div className="text-2xl font-bold flex justify-center">
              {grades.filter((g) => g.grade === grade.grade).length}
            </div>
          </div>
        ))}
      </div>
      {grades.map((grade) => (
        <div className="rounded-2xl bg-st-bg p-2 mt-2">
          <div className="flex justify-between">
            <p className="font-light">{grade.course}</p>
            <div
              className={` text-white rounded font-bold pr-1 pl-1 ${
                grade.grade == "A"
                  ? "bg-green-400/50"
                  : grade.grade == "B"
                  ? "bg-blue-400/50"
                  : grade.grade == "C"
                  ? "bg-amber-300/50"
                  : grade.grade == "D"
                  ? "bg-gray-500"
                  : "bg-red-400/50"
              }`}
            >
              {grade.grade}
            </div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <p className="font-light text-muted text-sm">{grade.lecturer} </p>
            <p className="font-light">{grade.credits} credits</p>
          </div>
          <div>
            <p className="font-light text-sm text-muted">
              Semester {grade.semester} - {grade.year}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
