import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"

const Jobspage = ({deleteJob}) => {
    const navigate=useNavigate('');
    const {id}=useParams();
    const [job, setJobs] = useState([]);
    const [company,setCompany]=useState([]);
    const [loading, setLoading] = useState(true);
    
    const onDeleteClick = (jobId) => {
      const confirm = window.confirm(
      'Are you sure you want to delete this listing?'
      );
      if (!confirm) return;
      deleteJob(jobId);
      toast.success("Job deleted sucessfully!")
      navigate('/jobs');
      };
    
      useEffect(() => {
        const fetchData = async() => {
          try {
            const res = await fetch(`/api/jobs/${id}`);
            const data = await res.json();
            setJobs(data);
            setCompany(data.company)
  
            
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(!loading);
          }
        };
        fetchData();
      }, [id]);
      
  
  return (
    <>
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          to="/jobs"
          className="text-teal-500 hover:text-teal-600 flex items-center"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Job Listings
        </Link>
      </div>
    </section>

    <section className="bg-teal-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div className="text-gray-500 mb-4">{job.type}</div>
              <h1 className="text-3xl font-bold mb-4">
                {job.title}
              </h1>
              <div
                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <i
                  className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                ></i>
                <p className="text-orange-700">{job.location}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-teal-800 text-lg font-bold mb-6">
                Job Description
              </h3>

              <p className="mb-4">
{job.description}              </p>

              <h3 className="text-teal-800 text-lg font-bold mb-2">Salary</h3>

              <p className="mb-4">{job.salary}</p>
            </div>
          </main>

          {/* <!-- Sidebar --> */}
          <aside>
            {/* <!-- Company Info --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Company Details</h3>

              <h2 className="text-2xl">{company.name}</h2>

              <p className="my-2">
{company.description}              </p>

              <hr className="my-4" />

              <h3 className="text-xl">Contact Email:</h3>

              <p className="my-2 bg-teal-100 p-2 font-bold">
                {company.contactEmail}
              </p>

              <h3 className="text-xl">Contact Phone:</h3>

              <p className="my-2 bg-teal-100 p-2 font-bold">{company.contactPhone}</p>
            </div>

            {/* <!-- Manage --> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-bold mb-6">Manage Job</h3>
              <Link
                to={`/edit-job/${job.id}`}
                className="bg-teal-500 hover:bg-teal-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Job</Link              >
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              onClick={()=>onDeleteClick(job.id)}>
                Delete Job
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
    </>
  )
}


export default Jobspage