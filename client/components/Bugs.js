import React from 'react'
import { Link, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBugs } from '../store/allBugsStore'
import { updateSingleBug } from '../store/singleBugStore'
import {fetchUsers} from '../store/allUsersStore'

function Bugs() {
  const dispatch = useDispatch()
  let history = useHistory();
  const bugs = useSelector((state) => state.allBugs)
  const [statusView, setStatusView] = useState("All");
  const [status, setStatus] = useState("");
  const [bugId, setBugId] = useState("");
  const [assignId, setAssignId] = useState();
  const [assignName, setAssignName] = useState();
  const users = useSelector((state) => state.allUsers)
  useEffect(() => {
    dispatch(fetchBugs())
  }, [])
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleChange = (event) => {
    event.preventDefault()
    setStatusView(event.target.value)
  }

  const handleChange2 = (event, bug) => {
    event.preventDefault()
    setStatus(event.target.value)
    setBugId(bug.id)
  }

  const handleChange3 = (event, bug) => {
    event.preventDefault()
    setAssignId(bug.id)
    const person = users.filter((user)=>user.id == event.target.value)
    setAssignName(person[0].username)
  }

  const handleSubmit2 = (event, bug) => {
    event.preventDefault()
    bug.userId = assignId
    bug.user = assignName
    bug.assigned = assignName
    bug.status = "Working"
    // bug.user.username = assignName
    bug.dateAssigned = new Date
    dispatch(updateSingleBug(bug))
    history.push("/bugs");
  }

  const handleSubmit = (event, bug) => {
    event.preventDefault()
    bug.status = status
    if(status == "Fixed") { bug.dateFixed = new Date} else{
      bug.dateFixed = null
    }
    setBugId("")
    dispatch(updateSingleBug(bug))
    history.push("/bugs");
  }


  return (
    <div className="row">
       <div style={{marginLeft: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="All">Filter by Status</option>
              <option value="New">New</option>
          <option value="Working">Working</option>
          <option value="Fixed">Fixed</option>
          <option value="All">ALL</option>
              </select>
              </div>

              <div>
      <div className='text-center'>
    <h1><u>{statusView} Bugs</u></h1>
    </div>
    </div>
    {bugs ? statusView == "All" ?
    <div>
      <div className='text-center'>
        <h1><u>New</u></h1>
        </div>
        <div className="row">
    {bugs.filter((bug) => bug.status == "New").map((bug) => {
      return(

        <div className='col' key={(bug.id)} style={{marginTop: "15px"}}>
  <div className="container text-center mt-2">
  {bug.priority == "High" ?<div className="card border border-5  border-danger rounded text-center" style={{width:"18rem"}}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Bug Name: <Link to={`/bugs/${bug.id}`}> {bug.name}</Link></h2>
  <h2 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Priority:  {bug.priority}</h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Assigned: <Link to={`/users/${bug.userId}`}> {bug.assigned}</Link></h3>
  <div>
            <div>
          <div style={{ marginBottom: "35px"}}>
      <select onChange={event => handleChange3(event, bug)}  name="filterEvents" className='custom-select'>
      <option value="">Assign Bug</option>
            {users.map((event) => <option key={event.id} value={event.id}>{event.username}</option>)}
              </select>
              </div>
              {assignId == bug.id ? <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={event => handleSubmit2(event, bug)}>Assign</button> : <div></div>}
              </div>
              </div>
  </div> : <div className="card border border-5  border-primary rounded text-center" style={{width:"18rem", color:"green"}}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Bug Name: <Link to={`/bugs/${bug.id}`}> {bug.name}</Link></h2>
  <h2 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Priority:  {bug.priority}</h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Assigned: <Link to={`/users/${bug.userId}`}> {bug.assigned}</Link></h3>
  <div>
            <div>
          <div style={{ marginBottom: "35px"}}>
      <select onChange={event => handleChange3(event, bug)}  name="filterEvents" className='custom-select'>
      <option value="">Assign Bug</option>
            {users.map((event) => <option key={event.id} value={event.id}>{event.username}</option>)}
              </select>
              </div>
              {assignId == bug.id ? <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={event => handleSubmit2(event, bug)}>Assign</button> : <div></div>}
              </div>
              </div>
  </div>}
  </div>
  </div>
      )
    })}
    </div>
 <div className='text-center'>
        <h1><u>Working</u></h1>
        </div>
        <div className="row">
    {bugs.filter((bug) => bug.status == "Working").map((bug) => {
      return(
        <div className='col' key={(bug.id)} style={{marginTop: "15px"}}>
        <div className="container text-center mt-2">
        {bug.priority == "High" ?<div className="card border border-5  border-danger rounded text-center" style={{width:"18rem"}}>
        <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Bug Name: <Link to={`/bugs/${bug.id}`}> {bug.name}</Link></h2>
        <h2 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Priority:  {bug.priority}</h2>
        <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Assigned: <Link to={`/users/${bug.userId}`}> {bug.assigned}</Link></h3>
        <div>
                  <div>
                <div style={{ marginBottom: "35px"}}>
            <select onChange={event => handleChange3(event, bug)}  name="filterEvents" className='custom-select'>
            <option value="">Assign Bug</option>
                  {users.map((event) => <option key={event.id} value={event.id}>{event.username}</option>)}
                    </select>
                    </div>
                    {assignId == bug.id ? <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={event => handleSubmit2(event, bug)}>Assign</button> : <div></div>}
                    </div>
                    </div>
        </div> : <div className='col' key={(bug.id)} style={{marginTop: "15px"}}>
  <div className="container text-center mt-2">
  <div className="card border border-5 border-primary  rounded text-center" style={{width:"18rem", color:"green"}}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Bug Name:<Link to={`/bugs/${bug.id}`}>  {bug.name}</Link></h2>
  <h2 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Priority:  {bug.priority}</h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Assigned:<Link to={`/users/${bug.userId}`}>  {bug.assigned} </Link></h3>
  <div>
          <div style={{marginTop: "15px", marginBottom: "15px"}}>
      <select onChange={event => handleChange2(event, bug)} name="filterEvents" className='custom-select'>
      <option value="">Update Status</option>
      <option value="New">New</option>
          <option value="Working">Working</option>
          <option value="Fixed">Fixed</option>
              </select>
              </div>
            {bugId == bug.id ?  <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={event => handleSubmit(event, bug)}>Submit</button> : <div></div>}
              </div>
  </div>
  </div>
  </div>}
  </div>
  </div>
      )
    })} </div>
     <div className='text-center'>
        <h1><u>Fixed</u></h1>
        </div>
        <div className="row">
    {bugs.filter((bug) => bug.status == "Fixed").map((bug) => {
      return(
        <div className='col' key={(bug.id)} style={{marginTop: "15px"}}>
  <div className="container text-center mt-2">
  <div className="card border border-5  border-primary rounded text-center" style={{width:"18rem"}}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Bug Name:<Link to={`/bugs/${bug.id}`}> {bug.name}</Link></h2>
  <h2 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Priority:  {bug.priority}</h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Assigned: <Link to={`/users/${bug.userId}`}>  {bug.assigned} </Link></h3>
  <div>
          <div style={{marginTop: "15px", marginBottom: "15px"}}>
      <select onChange={event => handleChange2(event, bug)} name="filterEvents" className='custom-select'>
      <option value="">Update Status</option>
      <option value="New">New</option>
          <option value="Working">Working</option>
          <option value="Fixed">Fixed</option>
              </select>
              </div>
            {bugId == bug.id ?  <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={event => handleSubmit(event, bug)}>Submit</button> : <div></div>}
              </div>
  </div>
  </div>
  </div>
      )
    })} </div></div>: bugs.filter((bug) => bug.status == statusView).map((bug) => {
      return(
  <div className='col' key={(bug.id)} style={{marginTop: "15px"}}>
        <div className="container text-center mt-2">
        {bug.priority == "High" ?<div className="card border border-5  border-danger rounded text-center" style={{width:"18rem"}}>
        <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Bug Name: <Link to={`/bugs/${bug.id}`}> {bug.name}</Link></h2>
        <h2 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Priority:  {bug.priority}</h2>
        <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Assigned: <Link to={`/users/${bug.userId}`}> {bug.assigned}</Link></h3>
        <div>
                  <div>
                <div style={{ marginBottom: "35px"}}>
            <select onChange={event => handleChange3(event, bug)}  name="filterEvents" className='custom-select'>
            <option value="">Assign Bug</option>
                  {users.map((event) => <option key={event.id} value={event.id}>{event.username}</option>)}
                    </select>
                    </div>
                    {assignId == bug.id ? <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={event => handleSubmit2(event, bug)}>Assign</button> : <div></div>}
                    </div>
                    </div>
        </div> :
  <div className="card border border-5  border-primary rounded text-center" style={{width:"18rem"}}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Bug Name: <Link to={`/bugs/${bug.id}`}>{bug.name}</Link></h2>
  <h2 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Priority:  {bug.priority}</h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Assigned: <Link to={`/users/${bug.userId}`}>  {bug.assigned}</Link></h3>
  {bug.status == "New" ?    <div>
          <div style={{ marginBottom: "35px"}}>
      <select onChange={event => handleChange3(event, bug)}  name="filterEvents" className='custom-select'>
      <option value="">Assign Bug</option>
            {users.map((event) => <option key={event.id} value={event.id}>{event.username}</option>)}
              </select>
              </div>
              {assignId == bug.id ? <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={event => handleSubmit2(event, bug)}>Assign</button> : <div></div>}
              </div> : <div>
          <div style={{marginTop: "15px", marginBottom: "15px"}}>
      <select onChange={event => handleChange2(event, bug)} name="filterEvents" className='custom-select'>
      <option value="">Update Status</option>
      <option value="New">New</option>
          <option value="Working">Working</option>
          <option value="Fixed">Fixed</option>
              </select>
              </div>
            {bugId == bug.id ?  <button className='btn btn-primary' style={{width:"10rem", marginLeft:"auto", marginRight: "auto", marginBottom: "15px"}} onClick={event => handleSubmit(event, bug)}>Submit</button> : <div></div>}
              </div>}
  </div>}
  </div>
  </div>
      )
    }): <div>No Bugs</div>}

  </div>
  )
}

export default Bugs
