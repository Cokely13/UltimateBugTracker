import React from 'react'
import { Link, useParams, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBug, updateSingleBug } from '../store/singleBugStore'
import {fetchUsers} from '../store/allUsersStore'


function BugDetail() {
  const dispatch = useDispatch()
  let history = useHistory();
  const {  bugId } = useParams();
  const [assignId, setAssignId] = useState();
  const [assignName, setAssignName] = useState();
  const [showButton, setShowButton] = useState();
  const [updateStatus, setUpdateStatus] = useState();
  const [updateAssign, setUpdateAssign] = useState();
  const [status, setStatus] = useState();
  const bug = useSelector((state) => state.singleBug)
  const users = useSelector((state) => state.allUsers)
  useEffect(() => {
    dispatch(fetchBug(bugId))
  }, [])
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    setUpdateStatus(1)
    setUpdateAssign(0)
  }

  const handleClick2 = (event) => {
    event.preventDefault()
    setUpdateAssign(1)
    setUpdateStatus(0)
  }

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

  const handleChange2 = (event) => {
    event.preventDefault()
    setStatus(event.target.value)
    setShowButton(2)
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
    setUpdateAssign("")
    dispatch(updateSingleBug(bug))
  }

  const handleSubmit2 = (event) => {
    event.preventDefault()
    bug.status = status
    if(status == "Fixed") { bug.dateFixed = new Date} else{
      bug.dateFixed = null
    }
    setShowButton("")
    setUpdateStatus("")
    dispatch(updateSingleBug(bug))
    history.push(`/bugs/${bug.id}`);
  }

  console.log("bug", bug)

  return (
    <div>
    {bug ?
        <div className='col' style={{marginTop: "50px", marginBottom: "15px"}} key={(bug.id)}>
        {bug.status == "Fixed" ?  <div className="card border border-5  border-dark rounded text-center" style={{width:"40rem", marginLeft: "auto", marginRight: "auto"}}>
          {bug.project? <h1>Project Name: {bug.project.name}</h1> : <div></div>}
          <h1>Bug Name: {bug.name}</h1>
          <h1>Description: {bug.description}</h1>
          <h1>Steps: {bug.steps}</h1>
         {bug.priority == 'High' ? <h1 className="card border border-5  border-danger rounded text-center">Priority: {bug.priority}</h1> : <h1 >Priority: {bug.priority}</h1>}
          <h1>Status: {bug.status} <div><button className='btn btn-primary' style={{marginTop: "15px"}} onClick={handleClick}>Update Status</button></div></h1>
          {updateStatus == 1 ?
         <div>
          <div>
          <div style={{ marginBottom: "35px"}}>
          <select onChange={handleChange2} name="filterEvents" className='custom-select'>
      <option value="">Update Status</option>
      <option value="New">New</option>
          <option value="Working">Working</option>
          <option value="Fixed">Fixed</option>
              </select>
              </div>

              {showButton == "2" ?  <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={handleSubmit2}>Submit</button>
              : <div></div>}
              </div>
              </div> : <div></div>}
          <h1>Assigned: {bug.assigned} <div><button className='btn btn-primary' style={{marginTop: "15px"}} onClick={handleClick2}>Update Assigned</button></div></h1>
         {updateAssign == 1 ?
         <div>
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
              </div>} </div> : <div></div>}
        </div> : <div className="card border border-5  border-dark rounded text-center" style={{width:"40rem", marginLeft: "auto", marginRight: "auto"}}>
          {bug.project? <h1>Project Name: {bug.project.name}</h1> : <div></div>}
          <h1>Bug Name: {bug.name}</h1>
          <h1>Description: {bug.description}</h1>
          <h1>Steps: {bug.steps}</h1>
          <h1>Priority: {bug.priority}</h1>
          <h1>Status: {bug.status} <div><button className='btn btn-primary' style={{marginTop: "15px"}} onClick={handleClick}>Update Status</button></div></h1>
          {updateStatus == 1 ?
         <div>
          <div>
          <div style={{ marginBottom: "35px"}}>
          <select onChange={handleChange2} name="filterEvents" className='custom-select'>
      <option value="">Update Status</option>
      <option value="New">New</option>
          <option value="Working">Working</option>
          <option value="Fixed">Fixed</option>
              </select>
              </div>

              {showButton == "2" ?  <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={handleSubmit2}>Submit</button>
              : <div></div>}
              </div>
              </div> : <div></div>}
          <h1>Assigned: {bug.assigned} <div><button className='btn btn-primary' style={{marginTop: "15px"}} onClick={handleClick2}>Update Assigned</button></div></h1>
         {updateAssign == 1 ?
         <div>
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
              </div>} </div> : <div></div>}
        </div>}
      </div>
     : <div>No Bugs</div>}

  </div>
  )
}

export default BugDetail
