
import React from 'react';
import { Link } from 'react-router-dom';


const ResourceNotFound = () => (
	<>
		<h2>Page Not Found</h2>
		<p>Sorry, we couldn't locate the URL you're searching for.</p>

		<Link to="/">Return Homepage</Link>
	</>
);

export default ResourceNotFound;