import React from 'react'
import "./toggleThemeButton.css"
export default function ToggleThemeButton({clickFunction}) {
  return (
   /* From Uiverse.io by vikramsinghnegi */ 
/* From Uiverse.io by Galahhad */ 
<label class="ui-switch">
  <input type="checkbox" onClick={clickFunction}/>
  <div class="slider">
    <div class="circle"></div>
  </div>
</label>
  )
}