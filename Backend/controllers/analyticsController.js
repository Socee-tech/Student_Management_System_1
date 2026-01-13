import Student from "../models/students.js";

export const studentsPerDepartment = async (req, res) => {
  try {
    const result = await Student.aggregate([
      {
        $group: {
          _id: "$department",
          totalStudents: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "departments",
          localField: "_id",
          foreignField: "_id",
          as: "department"
        }
      },
      { $unwind: "$department" },
      {
        $project: {
          _id: 0,
          departmentName: "$department.name",
          totalStudents: 1
        }
      },
      {
        $sort: { departmentName: 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students per department",
      error: error.message
    });
  }
};
