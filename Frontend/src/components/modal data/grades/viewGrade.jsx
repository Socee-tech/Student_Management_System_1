import { motion as Motion } from "framer-motion";
import { X } from "lucide-react";

export default function ViewGrade({ grade, onClose }) {
  const studentName = grade?.student?.name || "�";
  const regNo = grade?.student?.regNo || "�";
  const courseCode = grade?.course?.code || "�";
  const courseTitle = grade?.course?.title || "�";
  const department = grade?.department?.name || "�";
  const lecturer = grade?.lecturer?.name || "�";
  const marks = grade?.marks ?? "�";
  const gradeLetter = grade?.grade || "�";
  const semester = grade?.semester || "�";
  const academicYear = grade?.academicYear || "�";

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[101]"
      onClick={onClose}
    >
      <Motion.div
        initial={{ scale: 0.95, y: -10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        className="bg-foreground rounded-2xl w-full max-w-md md:max-w-3xl shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Grade Details</h3>
              <div className="text-sm text-primary/70">
                {studentName} ({regNo})
              </div>
            </div>
            <button type="button" onClick={onClose} aria-label="Close">
              <X size={22} />
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="min-w-full">
              <tbody>
                <tr className="odd:bg-t-odd hover:bg-t-hover">
                  <td className="tb-td font-semibold">Student</td>
                  <td className="tb-td">{studentName}</td>
                </tr>
                <tr className="odd:bg-t-odd hover:bg-t-hover">
                  <td className="tb-td font-semibold">Reg No</td>
                  <td className="tb-td">{regNo}</td>
                </tr>
                <tr className="odd:bg-t-odd hover:bg-t-hover">
                  <td className="tb-td font-semibold">Course</td>
                  <td className="tb-td">
                    {courseCode}
                    {courseTitle !== "�" ? ` - ${courseTitle}` : ""}
                  </td>
                </tr>
                <tr className="odd:bg-t-odd hover:bg-t-hover">
                  <td className="tb-td font-semibold">Department</td>
                  <td className="tb-td">{department}</td>
                </tr>
                <tr className="odd:bg-t-odd hover:bg-t-hover">
                  <td className="tb-td font-semibold">Lecturer</td>
                  <td className="tb-td">{lecturer}</td>
                </tr>
                <tr className="odd:bg-t-odd hover:bg-t-hover">
                  <td className="tb-td font-semibold">Marks</td>
                  <td className="tb-td">{marks}</td>
                </tr>
                <tr className="odd:bg-t-odd hover:bg-t-hover">
                  <td className="tb-td font-semibold">Grade</td>
                  <td className="tb-td">{gradeLetter}</td>
                </tr>
                <tr className="odd:bg-t-odd hover:bg-t-hover">
                  <td className="tb-td font-semibold">Semester</td>
                  <td className="tb-td">{semester}</td>
                </tr>
                <tr className="odd:bg-t-odd hover:bg-t-hover">
                  <td className="tb-td font-semibold">Academic Year</td>
                  <td className="tb-td">{academicYear}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <button type="button" className="action-accept" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
