import React from 'react'

function SederCheckbox(props) {
    return (
        <div>
            <label>{props.seder}
                <input type="checkbox" checked={props.checked[props.seder]} onChange={() => props.checked[props.seder] = !props.checked[props.seder]}></input>
            </label>
        </div>
    )
}

export default SederCheckbox
