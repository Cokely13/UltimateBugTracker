import React from 'react'
import { Link, useParams, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchProject, updateSingleProject } from '../store/singleProjectStore'
import {fetchUsers} from '../store/allUsersStore'


function ProjectDetail() {
  const dispatch = useDispatch()
  let history = useHistory();
  const {  projectId } = useParams();
  // const [assignId, setAssignId] = useState();
  // const [assignName, setAssignName] = useState();
  // const [showButton, setShowButton] = useState();
  const [seeBugs, setSeeBugs] = useState("");
  const project = useSelector((state) => state.singleProject)
  const users = useSelector((state) => state.allUsers)
  useEffect(() => {
    dispatch(fetchProject(projectId))
  }, [])
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    setSeeBugs(1)
  }


  console.log("bug", project)

  return (
    <div>
    {project ?
        <div className='col' style={{marginTop: "50px", marginBottom: "15px"}} key={(project.id)}>
          <div className="card border border-5  border-primary rounded text-center" style={{width:"40rem", marginLeft: "auto", marginRight: "auto"}}>
          <h1 style={{marginTop: "15px"}}> {project.name}</h1>
          {project.bugs? <div> <h1># of Bugs: {project.bugs.length}</h1>
          {project.bugs.length !== 0 && seeBugs == "" ? <button style={{marginTop: "15px", marginBottom: "15px"}} onClick={handleClick}>See Bugs</button>: <div></div>} </div> :  <div>NO BUGS!</div>}

  </div>
  </div>: <div></div>}
  {seeBugs == 1 ? <div>
    <h1 className='card border border-5  border rounded text-center bg-light' style={{width: "50%", marginLeft: "auto",marginRight: "auto", marginTop: "35px", marginBottom: "15px"}}>Bugs</h1>
    <div className="row">
    {project.bugs.map((bug) => {
        return(
          <div className='col' key={(bug.id)} style={{marginTop: "15px"}}>
        <div className="container text-center mt-2">
        {bug.priority == "High" ? <div className="card border border-5  border-danger rounded text-center" style={{width:"18rem"}}>
        <div className='text-center' >Bug Name: <Link to={`/bugs/${bug.id}`}>{bug.name} </Link>
          <div> Priority: {bug.priority}</div>
          <div> Status: {bug.status}</div>
          <div> Assigned: {bug.assigned}</div>
          </div>
          </div>
           : <div className="card border border-5  border rounded text-center" style={{width:"18rem"}}>
          <div className='text-center' >Bug Name: <Link to={`/bugs/${bug.id}`}>{bug.name} </Link>
          <div> Priority: {bug.priority}</div>
          <div> Status: {bug.status}</div>
          <div> Assigned: {bug.assigned}</div>
          </div>
          </div>}
          </div>
          </div>
        )})}
  </div></div> : <div></div>}

  </div>
  )
}

export default ProjectDetail
