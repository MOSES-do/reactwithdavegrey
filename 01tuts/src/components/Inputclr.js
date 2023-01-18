import React from 'react'
import colorNames from 'colornames';

const Inputclr = ({
    colorValue, setColorValue, setHexValue, isDarkText, setIsDarkText
}) => {
    return (
        <form id="clrForm" onSubmit={(e) => e.preventDefault()}>
            <label>Add Color Name:</label>
            <input type="text" autoFocus placeholder="Add color name" value={colorValue} onChange={(e) => {
                setColorValue(e.target.value);
                setHexValue(colorNames(e.target.value))
            }} required />

            <button type="button" onClick={() => setIsDarkText(!isDarkText)}>Toggle text color</button>
        </form>
    )
}

export default Inputclr;