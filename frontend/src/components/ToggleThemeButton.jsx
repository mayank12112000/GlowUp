import React from 'react'
import "./toggleThemeButton.css"
export default function ToggleThemeButton({clickFunction}) {
  return (
   /* From Uiverse.io by vikramsinghnegi */ 
<div class="toggle">
  <input type="checkbox" onClick={clickFunction} />
  <label></label>
</div>


  )
}
