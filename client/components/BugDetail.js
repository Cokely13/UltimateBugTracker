import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchBug } from '../store/singleBugStore'


function BugDetail() {
  const dispatch = useDispatch()
  const {  bugId } = useParams();
  const bug = useSelector((state) => state.singleBug)
  useEffect(() => {
    dispatch(fetchBug(bugId))
  }, [])

  return (
    <div>
    {bug ?
        <div key={(bug.id)}>
          <h1>{bug.name}</h1>
          <h1>{bug.description}</h1>
          <h1>{bug.steps}</h1>
          <h1>{bug.status}</h1>
          <div></div>
        </div>

     : <div>No Bugs</div>}

  </div>
  )
}

export default BugDetail
