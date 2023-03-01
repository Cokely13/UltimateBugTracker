import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBug, updateSingleBug } from '../store/singleBugStore'
import {fetchUsers} from '../store/allUsersStore'


function BugDetail() {
  const dispatch = useDispatch()
  const {  bugId } = useParams();
  const [assignId, setAssignId] = useState();
  const [assignName, setAssignName] = useState();
  const [showButton, setShowButton] = useState();
  const bug = useSelector((state) => state.singleBug)
  const users = useSelector((state) => state.allUsers)
  useEffect(() => {
    dispatch(fetchBug(bugId))
  }, [])
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])



  const handleChange = (event) => {
    event.preventDefault()
    if(event.target.value == "UnAssign"){
      setAssignId("")
      setAssignName('')
      setShowButton(1)
    } else {
    setAssignId(event.target.value)
    const person = users.filter((user)=>user.id == event.target.value)
    setAssignName(person[0].username)
    setShowButton(1)}
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(assignId == ""){
      bug.userId = null
      bug.user = null
      bug.assigned = "None"
      // bug.dateAssigned = null
      bug.status = "New"
    } else {
    bug.userId = assignId
    bug.user = assignName
    bug.assigned = assignName
    bug.status = "Working"
    bug.dateAssigned = new Date}
    setShowButton("")
    dispatch(updateSingleBug(bug))
  }

  return (
    <div>
    {bug ?
        <div className='col' key={(bug.id)}>
          <div className="card border border-5  border-primary rounded text-center" style={{width:"40rem", marginLeft: "auto", marginRight: "auto"}}>
          <h1>Name: {bug.name}</h1>
          <h1>Description: {bug.description}</h1>
          <h1>Steps: {bug.steps}</h1>
          <h1>Status: {bug.status}</h1>
          <h1>Assigned: {bug.assigned}</h1>
          <div></div>
          {bug.assigned == "None" ?
          <div>
          <div style={{ marginBottom: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
      <option disabled selected  value="">Assign Bug</option>
            {users.map((event) => <option key={event.id} value={event.id}>{event.username}</option>)}
              </select>
              </div>

              {showButton == "1" ?  <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={handleSubmit}>Assign</button>
              : <div></div>}
              </div>
              : <div>
          <div style={{ marginBottom: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
      <option disabled selected value="">Re-Assign Bug</option>
            {users.map((event) => <option key={event.id} value={event.id}>{event.username}</option>)}
            <option value={"UnAssign"}>UnAssign</option>)
              </select>
              </div>
              {showButton == "1" ? <button className='btn btn-secondary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={handleSubmit}>Re-Assign</button> : <div></div>}
              </div>}
        </div>
      </div>
     : <div>No Bugs</div>}

  </div>
  )
}

export default BugDetail
