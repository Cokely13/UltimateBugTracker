import React from 'react'
import { Link, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBugs } from '../store/allBugsStore'

function MediumPriority() {
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
      <h1 className='text-center'><u>Medium Priority</u></h1>
      {bugs? bugs.filter((bug)=>bug.priority == 'Medium').map((bug) => {
      return(
        <div className='text-center' key={bug.id}>{bug.name} by {bug.assigned} </div>
      )}) : <div></div>
}

    </div>
  )
}

export default MediumPriority
