export default function Transcript() {
  const student = {
    name: "John Doe",
    studentId: "123456",
    phone: "+254712345678",
    email: "john@gmail.com",
    department: "Computer Science",
    admDate: "2019-09-01",
    gradDate: "2023-06-30",
    mode: "full Time",
  };
  const acRecord = [
    {
      code: "CS101",
      title: "Introduction to Computer Science",
      units: 3,
      grade: "A",
      gradePoints: 12,
    },
    {
      code: "CS102",
      title: "Data Structures",
      units: 4,
      grade: "B+",
      gradePoints: 13.2,
    },
    {
      code: "CS103",
      title: "Algorithms",
      units: 4,
      grade: "A-",
      gradePoints: 14.8,
    },
    {
      code: "CS104",
      title: "Operating Systems",
      units: 3,
      grade: "B",
      gradePoints: 9,
    },
    {
      code: "CS105",
      title: "Database Systems",
      units: 3,
      grade: "A",
      gradePoints: 12,
    },
    {
      code: "CS106",
      title: "Computer Networks",
      units: 3,
      grade: "B+",
      gradePoints: 9.9,
    },
    {
      code: "CS107",
      title: "Software Engineering",
      units: 4,
      grade: "A-",
      gradePoints: 14.8,
    },
    {
      code: "CS108",
      title: "Artificial Intelligence",
      units: 3,
      grade: "A",
      gradePoints: 12,
    },
    {
      code: "CS109",
      title: "Machine Learning",
      units: 4,
      grade: "B+",
      gradePoints: 13.2,
    },
    {
      code: "CS110",
      title: "Computer Graphics",
      units: 3,
      grade: "A-",
      gradePoints: 14.8,
    },
  ];
  const GPASummary = [
    {
      semester: "Fall 2019",
      gpa: 3.5,
      totalUnits: 15,
      totalGradePoints: 52.5,
      class: "First Class",
    },
    {
      semester: "Spring 2020",
      gpa: 3.7,
      totalUnits: 15,
      totalGradePoints: 55.5,
      class: "First Class",
    },
    {
      semester: "Fall 2020",
      gpa: 3.8,
      totalUnits: 15,
      totalGradePoints: 57,
      class: "First Class",
    },
    {
      semester: "Spring 2021",
      gpa: 3.9,
      totalUnits: 15,
      totalGradePoints: 58.5,
      class: "First Class",
    },
    {
      semester: "Fall 2021",
      gpa: 4.0,
      totalUnits: 15,
      totalGradePoints: 60,
      class: "First Class",
    },
    {
      semester: "Spring 2022",
      gpa: 3.9,
      totalUnits: 15,
      totalGradePoints: 58.5,
      class: "First Class",
    },
    {
      semester: "Fall 2022",
      gpa: 3.8,
      totalUnits: 15,
      totalGradePoints: 57,
      class: "First Class",
    },
    {
      semester: "Spring 2023",
      gpa: 3.7,
      totalUnits: 15,
      totalGradePoints: 55.5,
      class: "First Class",
    },
  ];
  const gradingSystem = [
    { grade: "A", gradePoints: 4.0, marks: "80-100" },
    { grade: "A-", gradePoints: 3.7, marks: "75-79" },
    { grade: "B+", gradePoints: 3.3, marks: "70-74" },
    { grade: "B", gradePoints: 3.0, marks: "65-69" },
    { grade: "B-", gradePoints: 2.7, marks: "60-64" },
    { grade: "C+", gradePoints: 2.3, marks: "55-59" },
    { grade: "C", gradePoints: 2.0, marks: "50-54" },
    { grade: "C-", gradePoints: 1.7, marks: "45-49" },
    { grade: "D+", gradePoints: 1.3, marks: "40-44" },
    { grade: "D", gradePoints: 1.0, marks: "35-39" },
    { grade: "F", gradePoints: 0.0, marks: "0-34" },
  ];

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Transcript</h1>
      <p className="text-muted">
        This is the Transcript page. Here you can view and download your
        academic transcript, which includes a detailed record of your courses,
        grades, and academic performance throughout your studies.
      </p>
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
          Download Transcript
        </button>
      </div>
      <section className="p-2">
        <div className="w-full flex justify-center">
          <span>
            <div className="">
              <img
                src="https://studentportal.egerton.ac.ke/assets/images/Logo.png"
                alt="Transcript"
                className=" h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="mt-4 uppercase font-mono">
              Egerton University Transcript
            </div>
            <p>p.o.box: 6464-747-3732</p>
          </span>
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Student Information
          </h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-semibold">Name</td>
                <td className="border px-4 py-2">{student.name}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Student ID</td>
                <td className="border px-4 py-2">{student.studentId}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Phone</td>
                <td className="border px-4 py-2">{student.phone}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Email</td>
                <td className="border px-4 py-2">{student.email}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">Department</td>
                <td className="border px-4 py-2">{student.department}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Admission Date
                </td>
                <td className="border px-4 py-2">{student.admDate}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Graduation Date
                </td>
                <td className="border px-4 py-2">{student.gradDate}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-semibold">
                  Mode of Study
                </td>
                <td className="border px-4 py-2">{student.mode}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold mt-6 mb-2">Academic Record</h2>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Course Code</th>
                <th className="border px-4 py-2">Course Title</th>
                <th className="border px-4 py-2">Units</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Grade Points</th>
              </tr>
            </thead>
            <tbody>
              {acRecord.map((course, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{course.code}</td>
                  <td className="border px-4 py-2">{course.title}</td>
                  <td className="border px-4 py-2">{course.units}</td>
                  <td className="border px-4 py-2">{course.grade}</td>
                  <td className="border px-4 py-2">{course.gradePoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold mt-6 mb-2">GPA Summary</h2>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Semester</th>
                <th className="border px-4 py-2">GPA</th>
                <th className="border px-4 py-2">Total Units</th>
                <th className="border px-4 py-2">Total Grade Points</th>
                <th className="border px-4 py-2">Class</th>
              </tr>
            </thead>
            <tbody>
              {GPASummary.map((record, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{record.semester}</td>
                  <td className="border px-4 py-2">{record.gpa}</td>
                  <td className="border px-4 py-2">{record.totalUnits}</td>
                  <td className="border px-4 py-2">
                    {record.totalGradePoints}
                  </td>
                  <td className="border px-4 py-2">{record.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="flex justify-center">
            <h2 className="text-xl font-semibold mt-6 mb-2">Grading System</h2>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Grade Points</th>
                <th className="border px-4 py-2">Marks</th>
              </tr>
            </thead>
            <tbody>
              {gradingSystem.map((grade, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{grade.grade}</td>
                  <td className="border px-4 py-2">{grade.gradePoints}</td>
                  <td className="border px-4 py-2">{grade.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
