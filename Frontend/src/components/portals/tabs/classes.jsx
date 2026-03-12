import { ArrowDownNarrowWide, Search } from "lucide-react";

export default function Classes() {
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
      time: "Wed 11:00 AM - 12:30 PM",
      hall: "Hall B",
    },
    {
      name: "Physics 301",
      code: "PHYS301",
      lecturer: "Dr. Lee",
      time: "Fri 2:00 PM - 3:30 PM",
      hall: "Hall C",
    },
    {
      name: "Chemistry 101",
      code: "CHEM101",
      lecturer: "Dr. Brown",
      time: "Mon 1:00 PM - 2:30 PM",
      hall: "Hall D",
    },
    {
      name: "Biology 201",
      code: "BIO201",
      lecturer: "Prof. Davis",
      time: "Wed 3:00 PM - 4:30 PM",
      hall: "Hall E",
    },
    {
      name: "History 101",
      code: "HIST101",
      lecturer: "Dr. Wilson",
      time: "Fri 9:00 AM - 10:30 AM",
      hall: "Hall F",
    },
    {
      name: "Literature 201",
      code: "LIT201",
      lecturer: "Prof. Taylor",
      time: "Mon 11:00 AM - 12:30 PM",
      hall: "Hall G",
    },
  ];
  //   const filters = [
  //     { name: "today" },
  //     { name: "tomorrow" },
  //     { name: "this week" },
  //   ];
  return (
    <div className="p-1">
      <h1 className="text-2xl font-bold mb-4">Classes</h1>
      <div className="flex justify-between">
        <div className="flex rounded-xl bg-gray-500 p-1">
          <Search className="ml-2  mr-1 size-5 mt-1 text-muted" />
          <input
            type="text"
            className="focus:outline-none"
            placeholder={`search by class name or code`}
          />
        </div>
        <button className="border p-1 rounded flex">
          <p className="text-sm font-medium text-muted mr-2">Filter</p>
          <ArrowDownNarrowWide />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {classes.map((cls, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-st-bg flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold">{cls.name}</h3>
            <p className="text-sm text-muted">{cls.code}</p>
            <p>Lecturer: {cls.lecturer}</p>
            <p>Time: {cls.time}</p>
            <p>Hall: {cls.hall}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
