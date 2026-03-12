export default function Notices() {
  const notices = [
    {
      title: "Campus Closure",
      source: "Admin",
      date: "2024-06-15",
      message:
        "Due to severe weather conditions, the campus will be closed on June 15th. All classes and events are canceled for the day. Please stay safe and check your email for further updates.",
    },
    {
      title: "New Library Hours",
      source: "Library",
      date: "2024-06-10",
      message:
        "Starting June 20th, the library will be open from 8 AM to 10 PM on weekdays and 10 AM to 6 PM on weekends. Please plan your visits accordingly.",
    },
    {
      title: "Exam Schedule Released",
      source: "Registrar",
      date: "2024-06-05",
      message:
        "The exam schedule for the upcoming semester has been released. Please check the student portal for your specific exam dates and times.",
    },
    {
      title: "Health and Safety Guidelines",
      source: "Health Office",
      date: "2024-06-01",
      message:
        "Please review the updated health and safety guidelines for the campus. Masks are now optional, but we encourage everyone to practice good hygiene and social distancing.",
    },
    {
      title: "Career Fair Announcement",
      source: "Career Services",
      date: "2024-05-28",
      message:
        "The annual career fair will be held on July 10th. This is a great opportunity to connect with potential employers and explore internship and job opportunities.",
    },
    {
      title: "Parking Lot Maintenance",
      source: "Facilities",
      date: "2024-05-25",
      message:
        "The main parking lot will be closed for maintenance from June 1st to June 5th. Please use the secondary parking lot during this time.",
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 w-full flex justify-center">
        Latest Notices
      </h2>
      {notices.map((notice, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 bg-st-bg flex flex-col gap-2 mb-4"
        >
          <h3 className="text-lg font-semibold">{notice.title}</h3>
          <p className="text-sm text-muted">Source: {notice.source}</p>
          <p className="text-sm text-muted">Date: {notice.date}</p>
          <p>{notice.message}</p>
        </div>
      ))}
    </div>
  );
}
