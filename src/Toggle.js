import React from "react"
import PropTypes from "prop-types"

class Toggle extends React.Component {
  static propTypes = {
    defaultOn: PropTypes.bool,
    variables: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    ),
  }

  static defaultProps = {
    defaultOn: false,
  }

  isSimpleToggle = undefined

  constructor(props) {
    super(props)

    if (props.variables === undefined) {
      this.isSimpleToggle = true
      this.state = { on: props.defaultOn }
    } else {
      this.isSimpleToggle = false
      this.state = props.variables.reduce((state, variable) => {
        if (typeof variable === "string") {
          state[variable] = false
          return state
        } else if (typeof variable === "object") {
          Object.keys(variable).forEach(key => {
            state[key] = Boolean(variable[key])
          })
          return state
        } else {
          throw new Error(
            `Toggle's prop "variable" need to be an array of string or object.`,
          )
        }
      }, {})
    }
  }

  toggle = variables => {
    if (this.isSimpleToggle) {
      this.setState(prevState => ({
        on: !prevState.on,
      }))
    } else {
      if (Array.isArray(variables)) {
        this.setStateWithArray(variables)
      } else {
        this.setStateWithVariable(variables)
      }
    }
  }

  setOn = variables => {
    if (this.isSimpleToggle) {
      if (!this.state.on) {
        this.setState({ on: true })
      }
    } else {
      if (Array.isArray(variables)) {
        this.setStateWithArray(variables, true)
      } else {
        if (!this.state[variables]) {
          this.setStateWithVariable(variables, true)
        }
      }
    }
  }

  setOff = variables => {
    if (this.isSimpleToggle) {
      if (this.state.on) {
        this.setState({ on: false })
      }
    } else {
      if (Array.isArray(variables)) {
        this.setStateWithArray(variables, false)
      } else {
        if (this.state[variables]) {
          this.setStateWithVariable(variables, false)
        }
      }
    }
  }

  /**
   * @param {string} variable
   * @param {Boolean | undefined} value
   * - If value => value
   * - else => toggle
   */
  setStateWithVariable(variable, value = undefined) {
    this.setState(prevState => {
      const state = prevState
      state[variable] = value !== undefined ? value : !prevState[variable]
      return state
    })
  }

  /**
   * @param {Array} variables
   * @param {Boolean | undefined} value
   * - If value => value
   * - else => toggle
   */
  setStateWithArray(variables, value = undefined) {
    this.setState(prevState => {
      return variables.reduce((state, variable) => {
        state[variable] = value !== undefined ? value : !prevState[variable]
        return state
      }, prevState)
    })
  }

  render() {
    return this.props.children({
      ...this.state,
      toggle: this.toggle,
      setOn: this.setOn,
      setOff: this.setOff,
    })
  }
}

export default Toggle
