import React from "react"
import { withToggle } from "ultitoggle"

const WithToggle = ({ on, toggle, setOn, setOff }) => (
  <div>
    <p>{on ? "On" : "Off"}</p>
    <button onClick={toggle}>Toggle</button>
    <button onClick={setOn}>Set On</button>
    <button onClick={setOff}>Set Off</button>
  </div>
)

export default withToggle(WithToggle, { defaultOn: false })
