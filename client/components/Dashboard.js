import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBugs } from '../store/allBugsStore'

function Dashboard() {
  const dispatch = useDispatch()
  let history = useHistory();
  const {id} = useSelector((state) => state.auth )
  const bugs = useSelector((state) => state.allBugs )
  const [selectedEvent, setSelectedEvent] = useState("All")

  useEffect(() => {
    dispatch(fetchBugs())
    // Safe to add dispatch to the dependencies array
  }, [])

  return (
    <div className="row">
    <div className='col'>
    <div className="container text-center mt-2">
    <Link to={`/bugs`}><div className="card border border-5  border-primary rounded text-center"  style={{width:"18rem"}}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Priority: Low</h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}># of Bugs: {bugs.filter((bug) => bug.priority == "Low").length}</h3>
  </div></Link>
  </div>
  </div>
  <div className='col'>
  <div className="container text-center mt-2">
  <Link to={`/bugs`}><div className="card border border-5  border-primary rounded text-center" style={{width:"18rem"}}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Priority: Medium</h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}># of Bugs: {bugs.filter((bug) => bug.priority == "Medium").length}</h3>
  </div></Link>
  </div>
  </div>
  <div className='col'>
    <div className="container text-center mt-2"></div>
    <Link to={`/bugs`}><div className="card border border-5  border-primary rounded text-center" style={{width:"18rem" }}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Priority: High</h2>
  <h3 className="card-text" style={{marginTop: "15px", marginBottom: "15px"}}># of Bugs: {bugs.filter((bug) => bug.priority == "High").length}</h3>
  </div></Link>
  </div>
  </div>

  )
}

export default Dashboard
