import React from 'react'
import "./toggleThemeButton.css"
export default function ToggleThemeButton({clickFunction}) {
  return (
<label htmlFor="switch" className="switch">
  <input id="switch" type="checkbox" onClick={clickFunction} />
  <span className="slider"></span>
  <span className="decoration"></span>
</label>

  )
}