import React, { Component } from 'react'
import loading from "./Settings.gif"

export default class spinnerLogo extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src = {loading} alt="loading" />
      </div>
    )
  }
}
