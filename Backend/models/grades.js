import mongoose from "mongoose";

const GradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      enum: ["1", "2"],
      required: true,
    },
    marks: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    grade: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F"],
    },
    remark: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Automatic grade calculation
GradeSchema.pre("save", function (next) {
  if (this.marks >= 70) {
    this.grade = "A";
    this.remark = "Excellent";
  } else if (this.marks >= 60) {
    this.grade = "B";
    this.remark = "Very Good";
  } else if (this.marks >= 50) {
    this.grade = "C";
    this.remark = "Good";
  } else if (this.marks >= 40) {
    this.grade = "D";
    this.remark = "Pass";
  } else if (this.marks >= 30) {
    this.grade = "E";
    this.remark = "Below Average";
  } else {
    this.grade = "F";
    this.remark = "Fail";
  }
  next();
});

GradeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  // handle both direct updates and $set
  const marks = update.marks ?? (update.$set ? update.$set.marks : undefined);

  if (marks !== undefined) {
    let grade, remark;

    if (marks >= 70) {
      grade = "A";
      remark = "Excellent";
    } else if (marks >= 60) {
      grade = "B";
      remark = "Very Good";
    } else if (marks >= 50) {
      grade = "C";
      remark = "Good";
    } else if (marks >= 40) {
      grade = "D";
      remark = "Pass";
    } else if (marks >= 30) {
      grade = "E";
      remark = "Below Average";
    } else {
      grade = "F";
      remark = "Fail";
    }

    // Ensure $set exists
    if (!update.$set) update.$set = {};

    update.$set.grade = grade;
    update.$set.remark = remark;
  }

  next();
});

// to prevent duplicate grading
GradeSchema.index(
  { student: 1, course: 1, semester: 1, academicYear: 1 },
  { unique: true }
);

const Grade = mongoose.model("Grade", GradeSchema);
export default Grade;
