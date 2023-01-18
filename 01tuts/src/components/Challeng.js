import React from 'react'


const Challeng = ({ colorValue, hexValue, isDarkText }) => {

    return (
        <div className="box" style={{
            backgroundColor: colorValue,
            color: isDarkText ? "#000" : "#fff"
        }}>
            <p>{colorValue ? colorValue : "Empty value"}</p>
            <p>{hexValue ? hexValue : null}</p>
        </div>
    )
}

Challeng.defaultProps = {
    colorValue: "Empty Color Value"
}
export default Challeng