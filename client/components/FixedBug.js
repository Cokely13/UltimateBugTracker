import React from 'react'
import { Link, useHistory  } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBugs } from '../store/allBugsStore'

function FixedBug() {
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
      {bugs? bugs.filter((bug)=>bug.status == 'Fixed').map((bug) => {
      return(
        <div key={bug.id}>{bug.date} : {bug.name} </div>
      )}) : <div></div>
}

    </div>
  )
}

export default FixedBug
