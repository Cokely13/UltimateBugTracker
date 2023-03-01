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
      {users.map((user) => {
        return(
          <div key={user.id}>
            <Link to={`/users/${user.id}`} >{user.username}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default Users
