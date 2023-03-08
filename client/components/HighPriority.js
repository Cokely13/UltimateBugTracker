import React from 'react'
import { Link, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBugs } from '../store/allBugsStore'

function HighPriority() {
  const dispatch = useDispatch()
  let history = useHistory();
  const bugs = useSelector((state) => state.allBugs)
  const [statusView, setStatusView] = useState("All");
  const [status, setStatus] = useState("");
  const [bugId, setBugId] = useState("");
  useEffect(() => {
    dispatch(fetchBugs())
  }, [])

  console.log('bugs', bugs)
  return (
    <div>
      <h1 className='card border border-5  border rounded text-center bg-light' style={{width: "50%", marginLeft: "auto",marginRight: "auto", marginTop: "35px", marginBottom: "15px"}}>High Priority</h1>
      <div className="row">
      {bugs? bugs.filter((bug)=>bug.priority == 'High').map((bug) => {
      return(
        <div className='col' key={(bug.id)} style={{marginTop: "15px"}}>
            <div className="container text-center mt-2">
        <div className="card border border-5  border-primary rounded text-center" style={{width:"18rem"}}>
        <div className='text-center'>Project Name: <Link to={`/projects/${bug.projectId}`}>{bug.project.name} </Link> </div>
        <div className='text-center' key={bug.id}>Bug Name: <Link to={`/bugs/${bug.id}`}>{bug.name} </Link> </div>
        {bug.user? <div>Assigned to :  <Link to={`/users/${bug.user.id}`}>{bug.assigned} </Link>  </div>: <div></div>}
        </div>
        </div>
        </div>
      )}) : <div></div>
}

    </div>
    </div>
  )
}

export default HighPriority
