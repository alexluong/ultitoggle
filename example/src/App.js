import React, { Component } from "react"
import Toggle from "ultitoggle"
import WithToggle from "./WithToggle"

export default class App extends Component {
  render() {
    return (
      <div>
        <Toggle variables={["first", { second: true }, "third"]}>
          {({ first, second, third, toggle }) => (
            <div>
              <input
                type="checkbox"
                checked={first}
                onChange={() => toggle("first")}
              />
              <input
                type="checkbox"
                checked={second}
                onChange={() => toggle("second")}
              />
              <input
                type="checkbox"
                checked={third}
                onChange={() => toggle("third")}
              />

              <p>First {first ? "On" : "Off"}</p>
              <p>Second {second ? "On" : "Off"}</p>
              <p>Third {third ? "On" : "Off"}</p>
            </div>
          )}
        </Toggle>

        <hr />

        <Toggle variables={["hello", { hi: true }]}>
          {({ hello, hi, toggle, setOn, setOff }) => (
            <div>
              <p>Hello {hello ? "On" : "Off"}</p>
              <button onClick={() => toggle("hello")}>Toggle</button>
              <button onClick={() => setOn("hello")}>Set On</button>
              <button onClick={() => setOff("hello")}>Set Off</button>
              <br />
              <p>Hi {hi ? "On" : "Off"}</p>
              <button onClick={() => toggle("hi")}>Toggle</button>
              <button onClick={() => setOn("hi")}>Set On</button>
              <button onClick={() => setOff("hi")}>Set Off</button>
              <br />
              <button onClick={() => toggle(["hi", "hello"])}>Toggle</button>
              <button onClick={() => setOn(["hi", "hello"])}>Set On</button>
              <button onClick={() => setOff(["hi", "hello"])}>Set Off</button>
            </div>
          )}
        </Toggle>
        <hr />
        <Toggle defaultOn={true}>
          {({ on, toggle, setOn, setOff }) => (
            <div>
              <p>{on ? "On" : "Off"}</p>
              <button onClick={toggle}>Toggle</button>
              <button onClick={setOn}>Set On</button>
              <button onClick={setOff}>Set Off</button>
            </div>
          )}
        </Toggle>
        <hr />
        <WithToggle />
      </div>
    )
  }
}
