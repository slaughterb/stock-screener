
import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';


const Header = () => (
	<header>
		<nav className="navMenu">
			<Link className="navLink" to="/">Home</Link>
			<Link className="navLink" to="/dashboard">Dashboard</Link>
			<Link className="navLink" to="/financial-model">Screener</Link>
		</nav>
	</header>
);

export default Header;