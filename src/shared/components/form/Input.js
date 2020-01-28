import React, { Fragment } from 'react'

const Input = props => {
	// input checkbox, text, number,
	let element;

	if(props.element === 'input') {
		element = (
			<input 
				type={props.type} 
				className={`  ${props.hidden && "display-none"}`} 
				name={props.name} 
				value={props.value}
				placeholder={props.placeholder}
				checked={props.checked}
				onChange={props.onChange}
				minLength={props.minLength}
				maxLength={props.maxLength}
				required={props.required}
			/>
		)
	}
	
	if(props.element === 'select') {
		element = (
			<select name={props.name} value={props.value} onChange={props.onChange} required>
				{props.children}
			</select>
		)
	}

	return (
		<Fragment>
			<label htmlFor={props.htmlFor}>{props.label}</label>
			{element}
		</Fragment>
	)

}

export default Input
