import { ArrowDownNarrowWide, Search } from "lucide-react";

export default function Events() {
  const events = [
    {
      title: "Computer Science Tour",
      time: "Mon 2 March 2026",
      event: "Tour to fourteen falls",
    },
    {
      title: "Mathematics Workshop",
      time: "Wed 4 March 2026",
      event: "Workshop on calculus",
    },
    {
      title: "Physics Seminar",
      time: "Fri 6 March 2026",
      event: "Seminar on quantum mechanics",
    },
    {
      title: "Chemistry Lab",
      time: "Mon 9 March 2026",
      event: "Lab on chemical reactions",
    },
    {
      title: "Biology Field Trip",
      time: "Wed 11 March 2026",
      event: "Field trip to botanical garden",
    },
    {
      title: "History Lecture",
      time: "Fri 13 March 2026",
      event: "Lecture on ancient civilizations",
    },
  ];
  return (
    <div className="p-1">
      <h2 className="text-xl font-semibold mb-4 w-full flex justify-center">
        Upcoming Events
      </h2>
      <div className="flex justify-between">
        <div className="flex rounded-xl bg-gray-500 p-1">
          <Search className="ml-2  mr-1 size-5 mt-1 text-muted" />
          <input
            type="text"
            placeholder="search by event title"
            className="focus:outline-none"
          />
        </div>
        <button className="border p-1 rounded flex">
          <p className="text-sm font-medium text-muted mr-2">Filter</p>
          <ArrowDownNarrowWide />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-st-bg flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-muted">{event.time}</p>
            <p>{event.event}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
