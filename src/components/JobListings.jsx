import JobListing from "./JobListing";
import { useState, useEffect } from "react";
const JobListings = ({ isHome }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiUrl=isHome?"/api/jobs?_limit=3":"/api/jobs";
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(!loading);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-teal-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <h1>Loading.....</h1>
            ) : (
              <>
                {jobs.map((job) => {
                  return (
                    <>
                      <JobListing key={job.id} jobs={job} />
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListings;
