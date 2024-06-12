import React from 'react'
import axios from 'axios'

function Men() {
  axios.get('http://localhost:3001/Products?Product_Category=Men')
  .then(req=>console.log(req.data)).catch(error=>console.log(error))
  return (
    <div>
      Men
    </div>
  )
}

export default Men
