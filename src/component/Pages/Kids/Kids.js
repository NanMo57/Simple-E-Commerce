import React from 'react'
import axios from 'axios'

function Kids() {
   axios.get('http://localhost:3001/Products?Product_Category=Kids')
  .then(req=>console.log(req.data)).catch(error=>console.log(error))
  return (
    <div>
      Kids
    </div>
  )
}

export default Kids
