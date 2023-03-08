import React from 'react'
import { Link, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchProjects } from '../store/allProjectsStore'

function Projects() {
  const dispatch = useDispatch()
  let history = useHistory();
  const projects = useSelector((state) => state.allProjects)
  const [statusView, setStatusView] = useState("All");
  const [status, setStatus] = useState("");
  const [bugId, setBugId] = useState("");
  useEffect(() => {
    dispatch(fetchProjects())
  }, [])

  console.log("hey", projects)

  return (
    <div>
      <h1 className='card border border-5  border rounded text-center bg-light' style={{width: "50%", marginLeft: "auto",marginRight: "auto", marginTop: "35px", marginBottom: "15px"}}>Projects</h1>
      <div className="row">
      {projects? projects.map((project) => {
      return(
        <div className='col' key={(project.id)} style={{marginTop: "15px"}}>
           <div className="container text-center mt-2">
        <div className="card border border-5  border-primary rounded text-center" style={{padding: "10px"}}>
        <h1 className='text-center' ><Link to={`/projects/${project.id}`}>{project.name} </Link>
        </h1>
        <h2> # of Bugs: {project.bugs.length}</h2>
        </div>
        </div>
    </div>

      )}) : <div></div>
}
</div>
</div>
  )
}

export default Projects
