import React from 'react'
import { fetchUsers } from '../store/allUsersStore'
import { useHistory  } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBug } from '../store/allBugsStore'

function AddBug() {
  const dispatch = useDispatch()
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [steps, setSteps] = useState();
  const [priority, setPriority] = useState();
  // const [assigned, setAssigned] = useState();
  const [assignId, setAssignId] = useState();
  let history = useHistory();
  const [assignName, setAssignName] = useState();
  const users = useSelector((state) => state.allUsers)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
  }
  const handleChange2 = (event) => {
    event.preventDefault()
    setDescription(event.target.value)
  }
  const handleChange3 = (event) => {
    event.preventDefault()
    setSteps(event.target.value)
  }

  const handleChange4 = (event) => {
    event.preventDefault()
    setPriority(event.target.value)
  }

  const handleChange5 = (event) => {
    event.preventDefault()
    const person = users.filter((user)=>user.id == event.target.value)

    setAssignName(person[0].username)
    setAssignId(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    const newBug = {
      name: name,
      description: description,
      steps: steps,
      priority: priority,
      assigned: assignName,
      userId: assignId,
    }
    dispatch(createBug(newBug))
    history.push(`/home`)
  }


  return (
  <div >
    <form>
      <div >
        <div>
        <label> <h2 htmlFor="name" style={{marginRight: "10px"}}> Name: </h2></label>
          <input name='name' onChange={handleChange}  type="text" placeholder="Bug Name"/>
        </div>
        <div>
        <label> <h2 htmlFor="description" style={{marginRight: "10px"}}> Description: </h2></label>
          <input name='descriptuon' onChange={handleChange2}  type="text" placeholder="Describe the Bug"/>
        </div>
        <div>
        <label> <h2 htmlFor="steps" style={{marginRight: "10px"}}> Steps: </h2></label>
          <input name='steps' onChange={handleChange3} type="text" placeholder="Steps to bug"/>
        </div>
        <div>
        <div >
          <label> <h2 htmlFor="priority" style={{marginRight: "10px"}}>Priority: </h2></label>
          <div>
          <select  name="priority" onChange={handleChange4} className="priority">
        <option disabled selected value="priority">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          </select>
        </div> </div>
        <div >
          <label> <h2 htmlFor="assigned" style={{marginRight: "10px"}}>Assign: </h2></label>
          <div>
          <select  name="assigned" onChange={handleChange5} className="assigned">
        <option disabled selected value="assigned">Assign Bug</option>
        {users.map((( user) => <option key={user.id} value={user.id}>{user.username}</option>))}
          </select>
        </div> </div>
      </div>
      </div>
    </form>
    <div className="text-center">
    <button className="btn btn-primary text-center"  onClick={handleClick}>Create Bug</button>
    </div>
  </div>
  )
}

export default AddBug
