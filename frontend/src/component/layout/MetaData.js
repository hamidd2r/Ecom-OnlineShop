import React from 'react'
import Helmed from 'react-helmet'
const MetaData = ({title}) => {
  return (
    <>
        <Helmed>
            <title>{title}</title>
        </Helmed>
    </>
  )
}

export default MetaData