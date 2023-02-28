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
    <div>
    <div className="card border border-5  border-warning rounded text-center"  style={{width:"28rem", marginLeft: "30px", marginRight: "15px",marginBottom: "40px",marginTop: "40px", }}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Low</h2>
  <h3 className="card-text">{bugs.filter((bug) => bug.priority == "Low").length}</h3>
  </div>
  <div className="card border border-5  border-warning rounded text-center" style={{width:"28rem", marginLeft: "30px", marginRight: "15px",marginBottom: "40px",marginTop: "40px", }}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>Medium</h2>
  <h3 className="card-text">{bugs.filter((bug) => bug.priority == "Medium").length}</h3>
  </div>
  <div className="card border border-5  border-warning rounded text-center" style={{width:"28rem", marginLeft: "30px", marginRight: "15px",marginBottom: "40px",marginTop: "40px", }}>
  <h2 className="card-title" style={{marginTop: "15px", marginBottom: "15px"}}>High</h2>
  <h3 className="card-text">{bugs.filter((bug) => bug.priority == "High").length}</h3>
  </div>
  </div>


  )
}

export default Dashboard
