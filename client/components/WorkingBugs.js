import React from 'react'
import { Link, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBugs } from '../store/allBugsStore'

function WorkingBugs() {
  const dispatch = useDispatch()
  let history = useHistory();
  const bugs = useSelector((state) => state.allBugs)
  const [statusView, setStatusView] = useState("All");
  const [status, setStatus] = useState("");
  const [bugId, setBugId] = useState("");
  useEffect(() => {
    dispatch(fetchBugs())
  }, [])
  return (
    <div>
      <h1 className='card border border-5  border rounded text-center bg-light' style={{width: "50%", marginLeft: "auto",marginRight: "auto", marginTop: "35px", marginBottom: "15px"}}>Working Bugs</h1>
      {bugs? bugs.filter((bug)=>bug.status == 'Working').map((bug) => {
      return(
        <div className='text-center' key={bug.id}>{bug.date} : <Link to={`/bugs/${bug.id}`}>{bug.name} </Link> by {bug.assigned} </div>
      )}) : <div></div>
}

    </div>
  )
}

export default WorkingBugs
