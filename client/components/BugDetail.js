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
    setAssignId(event.target.value)
    const person = users.filter((user)=>user.id == event.target.value)
    setAssignName(person[0].username)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    bug.userId = assignId
    bug.user = assignName
    bug.assigned = assignName
    bug.status = "Working"
    dispatch(updateSingleBug(bug))
  }

  return (
    <div>
    {bug ?
        <div key={(bug.id)}>
          <h1>{bug.name}</h1>
          <h1>{bug.description}</h1>
          <h1>{bug.steps}</h1>
          <h1>{bug.status}</h1>
          <h1>{bug.assigned}</h1>
          <div></div>
          <div style={{marginLeft: "35px", marginBottom: "35px"}}>
      <select onChange={handleChange} name="filterEvents" className='custom-select'>
      <option value="">Assign Bug</option>
            {users.map((event) => <option key={event.id} value={event.id}>{event.username}</option>)}
              </select>
              </div>
              <button onClick={handleSubmit}>Assign</button>
        </div>

     : <div>No Bugs</div>}

  </div>
  )
}

export default BugDetail
