import React from 'react'
import "./toggleThemeButton.css"
export default function ToggleThemeButton({clickFunction}) {
  return (
   /* From Uiverse.io by vikramsinghnegi */ 
/* From Uiverse.io by Galahhad */ 
<label className="ui-switch">
  <input type="checkbox" onClick={clickFunction}/>
  <div className="slider">
    <div className="circle"></div>
  </div>
</label>
  )
}