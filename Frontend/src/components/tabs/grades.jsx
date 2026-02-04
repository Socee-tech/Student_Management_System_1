import { useCallback, useEffect, useState } from "react";
import EditGrade from "../modal data/grades/editGrade";
import DeleteGrade from "../modal data/grades/deleteGrade";
import ViewGrade from "../modal data/grades/viewGrade";
import AddGrade from "../modal data/grades/addGrade";
import API from "../../API/axios";
import DotLoader from "../spinner";
import UseNotify from "../../../snackBar/snackBar";

export default function Grades() {
  const { notifyError } = UseNotify();
  const [grades1, setGrades1] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState({
    regNo: "",
    course: "",
    department: "",
    semester: "",
    academicYear: "",
  });
  const [filteredGrades, setFilteredGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [Action, setAction] = useState({
    add: false,
    edit: "",
    delete: "",
    view: "",
  });

  const handleClose = () => {
    setAction({ add: false, edit: "", delete: "", view: "" });
  };

  const handleModalClose = () => setModalOpen(false);

  const selectAction = ({ value, action }) =>
    setAction({ ...Action, [action]: value });

  const grades = grades1;

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.id]: e.target.value });
  };

  /* ============================
     FILTER LOGIC
  ============================ */
  const applyFilters = useCallback(() => {
    let filtered = grades;

    if (filter.regNo) {
      filtered = filtered.filter((g) =>
        g.student?.regNo?.toLowerCase().includes(filter.regNo.toLowerCase())
      );
    }

    if (filter.course) {
      filtered = filtered.filter((g) =>
        g.course?.code?.toLowerCase().includes(filter.course.toLowerCase())
      );
    }

    if (filter.department) {
      filtered = filtered.filter((g) =>
        g.department?.name
          ?.toLowerCase()
          .includes(filter.department.toLowerCase())
      );
    }

    if (filter.semester) {
      filtered = filtered.filter((g) => g.semester === filter.semester);
    }

    if (filter.academicYear) {
      filtered = filtered.filter((g) =>
        g.academicYear
          ?.toLowerCase()
          .includes(filter.academicYear.toLowerCase())
      );
    }

    setFilteredGrades(filtered);
  }, [grades, filter]);

  useEffect(() => {
    applyFilters();
  }, [filter, grades, applyFilters]);

  /* ============================
     FETCH GRADES
  ============================ */
  const fetchGrades = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/grades");
      if (res && res.data) {
        setGrades1(res.data);
      }
    } catch (error) {
      console.error("Error fetching grades:", error);
      notifyError("Failed to fetch grades");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, [refresh]);

  let ID = 1;

  return (
    <div className="space-y-4 p-4">
      {/* HEADER */}
      <div className="flex justify-between overflow-auto md:flex-row gap-2 text-left w-full">
        <h2 className="text-xl font-bold">Grades List</h2>
        <button
          className="my-button"
          onClick={() => selectAction({ value: true, action: "add" })}
        >
          Add Grade
        </button>
      </div>

      {/* FILTERS */}
      <div className="w-full space-y-2 overflow-x-auto flex flex-col md:flex-row gap-2 text-left">
        <div className="flex">
          <label htmlFor="regNo" className="text-sm">
            Student RegNo:
          </label>
          <input
            id="regNo"
            type="text"
            value={filter.regNo}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="flex">
          <label htmlFor="course" className="text-sm">
            Course:
          </label>
          <input
            id="course"
            type="text"
            value={filter.course}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="flex">
          <label htmlFor="department" className="text-sm">
            Department:
          </label>
          <input
            id="department"
            type="text"
            value={filter.department}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div className="flex">
          <label htmlFor="semester" className="text-sm">
            Semester:
          </label>
          <select
            id="semester"
            value={filter.semester}
            onChange={handleChange}
            className="input-field"
          >
            <option value="" className="select-bg">
              All
            </option>
            <option value="1" className="select-bg">
              1
            </option>
            <option value="2" className="select-bg">
              2
            </option>
          </select>
        </div>

        <div className="flex">
          <label htmlFor="academicYear" className="text-sm">
            Academic Year:
          </label>
          <input
            id="academicYear"
            type="text"
            value={filter.academicYear}
            onChange={handleChange}
            className="input-field"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-t-bg">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">STUDENT</th>
              <th className="p-2 text-left">REG NO</th>
              <th className="p-2 text-left">COURSE</th>
              <th className="p-2 text-left">DEPARTMENT</th>
              <th className="p-2 text-left">MARKS</th>
              <th className="p-2 text-left">GRADE</th>
              <th className="p-2 text-left">SEM</th>
              <th className="p-2 text-left">YEAR</th>
              <th className="p-2 text-left">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredGrades.map((grade) => (
              <tr key={grade._id} className="odd:bg-t-odd hover:bg-t-hover">
                <td className="border-0 p-2 border-b-2 border-b-primary">
                  {ID++}
                </td>
                <td className="border-0 p-2 border-b-2 border-b-primary">
                  {grade.student?.name}
                </td>
                <td className="border-0 p-2 border-b-2 border-b-primary">
                  {grade.student?.regNo}
                </td>
                <td className="border-0 p-2 border-b-2 border-b-primary">
                  {grade.course?.code}
                </td>
                <td className="border-0 p-2 border-b-2 border-b-primary">
                  {grade.department?.name}
                </td>
                <td className="border-0 p-2 border-b-2 border-b-primary">
                  {grade.marks}
                </td>
                <td className="border-0 p-2 border-b-2 border-b-primary">
                  {grade.grade}
                </td>
                <td className="border-0 p-2 border-b-2 border-b-primary">
                  {grade.semester}
                </td>
                <td className="border-0 p-2 border-b-2 border-b-primary">
                  {grade.academicYear}
                </td>
                <td className="border-0 p-2 border-b-2 border-b-primary">
                  <div className="flex">
                    <button
                      className="action-btn bg-green-600"
                      onClick={() =>
                        selectAction({ value: grade, action: "edit" })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn bg-red-600"
                      onClick={() =>
                        selectAction({ value: grade, action: "delete" })
                      }
                    >
                      Delete
                    </button>
                    <button
                      className="action-btn bg-blue-600"
                      onClick={() =>
                        selectAction({ value: grade, action: "view" })
                      }
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && <DotLoader />}

        {Action.add && <AddGrade refresh={setRefresh} onClose={handleClose} />}
        {Action.edit && (
          <EditGrade
            grade={Action.edit}
            refresh={setRefresh}
            onClose={handleClose}
          />
        )}
        {Action.delete && (
          <DeleteGrade
            grade={Action.delete}
            refresh={setRefresh}
            onClose={handleClose}
          />
        )}
        {Action.view && <ViewGrade grade={Action.view} onClose={handleClose} />}
        {modalOpen && (
          <AddGrade refresh={setRefresh} onClose={handleModalClose} />
        )}
      </div>
    </div>
  );
}
