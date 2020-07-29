import React from 'react';

import './About.css';

const About = () => {
	return (
		<div className="about">
			<h2>About</h2>

			<p>
				This site is part of my portfolio: <a className="website-link" href="https://julienblondeau.com">julienblondeau.com</a>.
			</p>

			<h2>Contact</h2>

			<a className="contact-link" href="mailto:julienblondeaupro@protonmail.com">
				julienblondeaupro@protonmail.com
			</a>
		</div>
	);
};

export default About;
