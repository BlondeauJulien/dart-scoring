import React, { Fragment } from 'react';

import './Input.css';

const Input = props => {
	// input checkbox, text, number,
	let element;

	if(props.element === 'input') {
		element = (
			<input
				id={props.id}
				type={props.type} 
				className={props.classNameInput} 
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
			<div className="select-input-cont">
				<select name={props.name} value={props.value} onChange={props.onChange} className="select-input" required>
					{props.children}
				</select>
			</div>
		)
	}

	return (
		<Fragment>
			<label htmlFor={props.htmlFor} className={props.classNameLabel}>{props.label}</label>
			{element}
		</Fragment>
	)

}

export default Input
