import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSingleUser } from '../store/singleUserStore'
import {fetchProjects} from '../store/allProjectsStore'


function Profile() {
  const dispatch = useDispatch()
  let history = useHistory();
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const projects = useSelector((state) => state.allProjects )
  const [selectedEvent, setSelectedEvent] = useState("All")

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])

  useEffect(() => {
    dispatch(fetchProjects())
    // Safe to add dispatch to the dependencies array
  }, [])

  console.log("projects", projects)


  return (
    <div>
    <h1 className='card border border-5  border rounded text-center bg-light' style={{width: "50%", marginLeft: "auto",marginRight: "auto", marginTop: "35px", marginBottom: "15px"}}>Profile</h1>
    <div className="row">
    {user.bugs ?  user.bugs.map((bug) => {
              return (
<div className='col ' key={(bug.id)}>
  <div className="container text-center mt-2">
  <div className="card border border-5  border-primary rounded text-center" style={{padding: "10px"}}>
    <div>
          {projects? projects.filter((project) => project.id == bug.projectId).map((project) => {
              return (
                <h1 className="card-title" key={project.id}> Project Name: <Link to={`/projects/${project.id}`}>{project.name} </Link></h1>
              )}) : <div></div>}
          <h2 className="card-title" >Bug Name: {bug.name}</h2>
          <h4>Description: {bug.description}</h4>
          <h4>Steps: {bug.steps}</h4>
          <h4>Priority: {bug.priority}</h4>
          <h1>Status: {bug.status}</h1>
          </div>
          </div>
          </div>
    </div>
  )}) : <div>No Bugs</div>}
  </div>
  </div>
  )
}

export default Profile
