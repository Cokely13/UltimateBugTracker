import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchSingleUser } from '../store/singleUserStore'


function UserPage() {
  const dispatch = useDispatch()
  const { userId } = useParams();
  let history = useHistory();
  const {id} = useSelector((state) => state.auth )
  const user = useSelector((state) => state.singleUser )
  const [selectedEvent, setSelectedEvent] = useState("All")

  useEffect(() => {
    dispatch(fetchSingleUser(userId))
    // Safe to add dispatch to the dependencies array
  }, [])
  return (
    <div>
    <h1 className='text-center'><u>{user.username}'s Bugs</u></h1>
    {user.bugs ?  user.bugs.map((bug) => {
      return (
<div className='col' key={(bug.id)} style={{marginTop: "15px"}}>
<div className="container text-center mt-2">
<div className="card border border-5  border-primary rounded text-center" style={{width:"18rem"}}>
<div key={(bug.id)}>
  <h1 className="card-title" >{bug.name}</h1>
  <h1>{bug.description}</h1>
  <h1>{bug.steps}</h1>
  <h1>{bug.status}</h1>
  </div>
  </div>
  </div>
</div>
)}) : <div>No Bugs</div>}
</div>
  )
}

export default UserPage
