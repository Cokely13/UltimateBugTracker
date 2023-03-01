import React from 'react'
import { Link, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBugs } from '../store/allBugsStore'
import { updateSingleBug } from '../store/singleBugStore'


function Bugs() {
  const dispatch = useDispatch()
  let history = useHistory();
  const bugs = useSelector((state) => state.allBugs)
  const [statusView, setStatusView] = useState("All");
  const [status, setStatus] = useState("");
  const [bugId, setBugId] = useState("");
  useEffect(() => {
    dispatch(fetchBugs())
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

  const handleSubmit = (event, bug) => {
    event.preventDefault()
    bug.status = status
    setBugId("")
    dispatch(updateSingleBug(bug))
    history.push("/bugs");
  }

  return (
    <div className="row">
       <div style={{marginLeft: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
              <option value="All">Filter by Status</option>
              <option value="Unassigned">Unassigned</option>
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
        <h1><u>Unassigned</u></h1>
        </div>
        <div className="row">
    {bugs.filter((bug) => bug.status == "Unassigned").map((bug) => {
      return(
        // <div key={(bug.id)}>
        //   <h1>{bug.name}</h1>

        // </div>

        <div className='col' key={(bug.id)} style={{marginTop: "15px"}}>
  <div className="container text-center mt-2">
  <div className="card border border-5  border-primary rounded text-center" style={{width:"18rem"}}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Bug Name: <Link to={`/bugs/${bug.id}`}> {bug.name}</Link></h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Status: {bug.status}</h3>
  <div>
          <div style={{marginTop: "15px", marginBottom: "15px"}}>
      <select onChange={event => handleChange2(event, bug)} name="filterEvents" className='custom-select'>
      <option value="">Update Status</option>
      <option value="Unassigned">Unassigned</option>
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
  <div className="card border border-5  border-primary rounded text-center" style={{width:"18rem"}}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Bug Name:<Link to={`/bugs/${bug.id}`}>  {bug.name}</Link></h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Status: {bug.status}</h3>
  <div>
          <div style={{marginTop: "15px", marginBottom: "15px"}}>
      <select onChange={event => handleChange2(event, bug)} name="filterEvents" className='custom-select'>
      <option value="">Update Status</option>
      <option value="Unassigned">Unassigned</option>
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
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Status: {bug.status}</h3>
  <div>
          <div style={{marginTop: "15px", marginBottom: "15px"}}>
      <select onChange={event => handleChange2(event, bug)} name="filterEvents" className='custom-select'>
      <option value="">Update Status</option>
      <option value="Unassigned">Unassigned</option>
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
  <div className="card border border-5  border-primary rounded text-center" style={{width:"18rem"}}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Bug Name: <Link to={`/bugs/${bug.id}`}>{bug.name}</Link></h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}>Status: {bug.status}</h3>
  <div>
          <div style={{marginTop: "15px", marginBottom: "15px"}}>
      <select onChange={event => handleChange2(event, bug)} name="filterEvents" className='custom-select'>
      <option value="">Update Status</option>
      <option value="Unassigned">Unassigned</option>
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
    }): <div>No Bugs</div>}

  </div>
  )
}

export default Bugs
