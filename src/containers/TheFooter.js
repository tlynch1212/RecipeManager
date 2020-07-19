import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div  className="mfs-auto">
        <span className="mr-1">Source Code: </span>
        <a href="https://github.com/tlynch1212/RecipeManager"
          target="_blank" rel="noopener noreferrer">Github</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
