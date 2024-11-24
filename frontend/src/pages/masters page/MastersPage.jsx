import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function MastersPage() {
  const {type} = useParams()
  return (
    <div>
      masterpage
    </div>
  )
}
