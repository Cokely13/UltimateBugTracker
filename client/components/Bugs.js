import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBugs } from '../store/allBugsStore'


function Bugs() {
  const dispatch = useDispatch()
  const bugs = useSelector((state) => state.allBugs)
  useEffect(() => {
    dispatch(fetchBugs())
  }, [])

  return (
    <div>
    {bugs ? bugs.map((bug) => {
      return(
        <div key={(bug.id)}>
          <h1>{bug.name}</h1>

        </div>
      )
    }): <div>No Bugs</div>}

  </div>
  )
}

export default Bugs
