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
      <h1 className='text-center'><u>Users</u></h1>
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
