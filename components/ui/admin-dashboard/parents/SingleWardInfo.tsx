import React from 'react'


interface IsingleWard {
  dataId: string;
  classes: string[];
}

const SingleWardInfo: React.FC<IsingleWard> = ({dataId, classes}) => {
  return (
    <div>SingleWardInfo</div>
  )
}

export default SingleWardInfo