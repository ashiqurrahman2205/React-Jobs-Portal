import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from "react-router-dom"
import Homepage from "./pages/Homepage"
import MainLayout from "./Layouts/MainLayout"
import NotFound from "./pages/NotFound"
import Jobpage,{jobLoader} from "./pages/Jobpage"
import Jobspage from "./pages/Jobspage"
import AddJobPage from "./pages/AddJobPage"
import EditJobPage from "./pages/EditJobPage"




const App = () => {
  const deleteJob=async(id)=>{
    console.log(id);
    const res=await fetch(`/api/jobs/${id}`,{
      method:'DELETE',
      
    });
    return;
  }
  const addJob=async (newjob)=>{
    console.log(newjob)
    const res=await fetch('/api/jobs',{
      method:'POST',
      header:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(newjob),
    });
    return;
  }
  const updateJob=async (job)=>{
    const res=await fetch(`/api/jobs/${job.id}`,{
      method:'PUT',
      header:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(job),
    });
    return;
  }
  let router=createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<Homepage/>}/>
      <Route path="/jobs" element={<Jobpage/>}/>
      <Route path="/jobs/:id" element={<Jobspage deleteJob={deleteJob}/>}/>
      <Route path="*" element={<NotFound/>}/>
      <Route path="add-job" element={<AddJobPage addJobSubmit={addJob}/>} />
      <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/>
    </Route>
    )
  )
  return (
    <>
    <RouterProvider router={router}/>    
    </>
  )
}

export default App
