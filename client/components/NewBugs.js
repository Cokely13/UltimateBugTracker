import React from 'react'
import { Link, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBugs } from '../store/allBugsStore'

function NewBugs() {
  const dispatch = useDispatch()
  let history = useHistory();
  const bugs = useSelector((state) => state.allBugs)
  const [statusView, setStatusView] = useState("All");
  const [status, setStatus] = useState("");
  const [bugId, setBugId] = useState("");
  useEffect(() => {
    dispatch(fetchBugs())
  }, [])
  return (
    <div>
      <h1 className='card border border-5  border rounded text-center bg-light' style={{width: "50%", marginLeft: "auto",marginRight: "auto", marginTop: "35px", marginBottom: "15px"}}>New Bugs</h1>
      <div className="row">
      {bugs? bugs.filter((bug)=>bug.status == 'New').map((bug) => {
      return(
        <div className='col' key={(bug.id)} style={{marginTop: "15px"}}>
        <div className="container text-center mt-2">
    <div className="card border border-5  border-primary rounded text-center" style={{width:"18rem"}}>
    <div className='text-center'>Project Name: <Link to={`/projects/${bug.projectId}`}>{bug.project.name} </Link> </div>
    <div>Bug Name: <Link to={`/bugs/${bug.id}`}>{bug.name} </Link> </div>
    <div >Priority: {bug.priority} </div>
    <div >Date: {bug.date} </div>
    {bug.user? <div>Assigned to :  <Link to={`/users/${bug.user.id}`}>{bug.assigned} </Link>  </div>: <div></div>}
    </div>
    </div>
    </div>
  )}) : <div></div>




      //   <div className='text-center' key={bug.id}>{bug.date} : <Link to={`/bugs/${bug.id}`}>{bug.name} </Link> by {bug.assigned} </div>
      // )}) : <div></div>
}
</div>
    </div>
  )
}

export default NewBugs
