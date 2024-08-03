
import JobListings from "../components/JobListings"


const Jobpage = () => {
  return (
    <JobListings isHome={false}/>
  )
}

const jobLoader=async ({params})=>{
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
}
export{Jobpage as default,jobLoader}