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
    <div>Dashboard</div>
    {bugs.filter((bug) => bug.priority == "Low").length}
    <div>
    {bugs.filter((bug) => bug.priority == "Medium").length}
    </div>
    <div>
    {bugs.filter((bug) => bug.priority == "High").length}
    </div>
    </div>

  )
}

export default Dashboard
