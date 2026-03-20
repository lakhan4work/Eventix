import { Link } from "react-router-dom";

export default function Careers() {
  const jobs = [
    {
      title: "Frontend Developer",
      location: "Remote / India",
      type: "Full-time",
      desc: "Build responsive and interactive UI using React and modern frontend tools.",
    },
    {
      title: "Backend Developer",
      location: "Remote / India",
      type: "Full-time",
      desc: "Develop scalable APIs and handle database architecture.",
    },
    {
      title: "UI/UX Designer",
      location: "Remote",
      type: "Contract",
      desc: "Design clean, user-friendly interfaces and improve user experience.",
    },
  ];

  return (
    <div className="p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-3">Careers</h1>
        <p className="text-gray-600 max-w-2xl">
          Join our team and help build amazing event experiences.
          We’re looking for passionate people who want to make an impact.
        </p>
      </div>

      {/* Why Work With Us */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Why Work With Us?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-5 rounded-xl">
            <h3 className="font-semibold mb-2">Flexible Work</h3>
            <p className="text-sm text-gray-600">
              Work remotely with flexible hours and a healthy work-life balance.
            </p>
          </div>
          <div className="border p-5 rounded-xl">
            <h3 className="font-semibold mb-2">Growth Opportunities</h3>
            <p className="text-sm text-gray-600">
              Continuous learning, mentorship, and career development.
            </p>
          </div>
          <div className="border p-5 rounded-xl">
            <h3 className="font-semibold mb-2">Innovative Projects</h3>
            <p className="text-sm text-gray-600">
              Work on cutting-edge technologies and impactful products.
            </p>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Open Positions</h2>

        <div className="space-y-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {job.location} • {job.type}
              </p>
              <p className="text-gray-600 mt-3">{job.desc}</p>

              {/* Updated Apply Button */}
              <Link to="/apply">
                <button className="mt-4 px-6 py-2 font-bold rounded-lg border transition-all duration-300
                  bg-black text-white 
                  hover:bg-white hover:text-black 
                  hover:shadow-lg hover:scale-105">
                  Apply Now →
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center border-t pt-8">
        <h2 className="text-xl font-semibold mb-2">
          Didn’t find a suitable role?
        </h2>
        <p className="text-gray-600 mb-4">
          Send us your resume and we’ll reach out when a role matches.
        </p>

        <Link to="/apply">
          <button className="px-6 py-2 font-bold rounded-lg border transition-all duration-300
            bg-black text-white 
            hover:bg-white hover:text-black 
            hover:shadow-lg hover:scale-105">
            Contact Us →
          </button>
        </Link>
      </div>
    </div>
  );
}