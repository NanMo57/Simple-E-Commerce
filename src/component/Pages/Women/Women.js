import React from 'react'
import axios from 'axios'

function Women() {
   axios.get('http://localhost:3001/Products?Product_Category=Women')
  .then(req=>console.log(req.data)).catch(error=>console.log(error))
  return (
    <div>
      Women
    </div>
  )
}

export default Women
