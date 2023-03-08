import React from 'react'
import { fetchUsers } from '../store/allUsersStore'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Users() {

  const dispatch = useDispatch()
  const users = useSelector((state) => state.allUsers)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      <h1 className='card border border-5  border rounded text-center bg-light' style={{width: "50%", marginLeft: "auto",marginRight: "auto", marginTop: "35px", marginBottom: "15px"}}>Users</h1>
      {users.map((user) => {
        return(
          <div key={user.id}>
           <h1><Link to={`/users/${user.id}`} >{user.username}</Link></h1>
            <h2># of Bugs: {user.bugs.length}</h2>
          </div>
        )
      })}
    </div>
  )
}

export default Users
