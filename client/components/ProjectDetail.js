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
  const [seeBugs, setSeeBugs] = useState();
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
          <h1>Name: {project.name}</h1>
          {project.bugs? <div> <h1># of Bugs: {project.bugs.length}</h1>
          {project.bugs.length !== 0 ? <button style={{marginTop: "15px", marginBottom: "15px"}} onClick={handleClick}>See Bugs</button>: <div></div>} </div> :  <div>NO BUGS!</div>}

  </div>
  </div>: <div></div>}
  {seeBugs == 1 ? <div>
    {project.bugs.map((bug) => {
        return(
          <div key={bug.id}>
          <div className='text-center' >Bug Name: <Link to={`/bugs/${bug.id}`}>{bug.name} </Link>
          <div> Priority: {bug.priority}</div>
          <div> Status: {bug.status}</div>
          <div> Assigned: {bug.assigned}</div>
          </div>
          </div>
        )})}
  </div> : <div></div>}

  </div>
  )
}

export default ProjectDetail
