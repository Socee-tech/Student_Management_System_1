import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  Department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  Title: String,
  Date: Date,
  Description: String,
  Venue: String,
});

EventSchema.index(
  { Title: 1, Department: 1, Description: 1 },
  { unique: true }
);

const Event = mongoose.model("Event", EventSchema);

export default Event;
