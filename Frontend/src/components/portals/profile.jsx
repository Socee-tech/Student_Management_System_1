import { Mail } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [proClicked, setProClicked] = useState(false);
  const proDetails = {
    name: "John Doe",
    regNo: "123456",
    email: "john@gmail.com",
    phone: "+254712345678",
    department: "Computer Science",
    admDate: "2019-09-01",
    mode: "full Time",
    img: "../../../images/image3.jpg",
    Location: "Nairobi, Kenya",
  };
  return (
    <div className="p-1">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-st-bg p-6 rounded-lg shadow-md transition-all duration-300">
        <div className="flex items-center mb-4">
          <div
            className={`h-15 w-15 overflow-hidden rounded-full mr-4 hover:cursor-pointer transition-all duration-300 ${
              proClicked ? "h-50 w-50" : ""
            }`}
            onClick={() => setProClicked((prev) => !prev)}
          >
            <img
              src={proDetails.img}
              alt="Profile"
              className="flex-1 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{proDetails.name}</h2>
            <p className="text-gray-600">{proDetails.department} Student</p>
          </div>
        </div>
        <div className="text-muted">
          <p>
            <span className="font-semibold">Registration No:</span>{" "}
            {proDetails.regNo}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {proDetails.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {proDetails.phone}
          </p>
          <p>
            <span className="font-semibold">Department:</span>{" "}
            {proDetails.department}
          </p>
          <p>
            <span className="font-semibold">Admission Date:</span>{" "}
            {proDetails.admDate}
          </p>
          <p>
            <span className="font-semibold">Mode of Study:</span>{" "}
            {proDetails.mode}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p className="text-muted">
            Email:
            <a
              href="mailto:sospeterngeresa@gmail.com"
              className="text-blue-500 hover:underline"
            >
              <span className="ml-1">
                <Mail size={16} className="inline-block" /> {proDetails.email}
              </span>
            </a>
          </p>
          <p className="text-muted">{proDetails.phone}</p>
          <p className="text-muted">{proDetails.Location}</p>
        </div>
      </div>
    </div>
  );
}
