import React from "react"
import Toggle from "./Toggle"

const withToggle = (Component, toggleProps = {}) => {
  return props => (
    <Toggle {...toggleProps}>
      {toggleChildrenProps => <Component {...props} {...toggleChildrenProps} />}
    </Toggle>
  )
}

export default withToggle
