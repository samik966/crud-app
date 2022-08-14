import { NavLink } from "react-router-dom"
import './Navbar.scss'

const Navbar = () => {
	return (
		<header className='header bg-primary py-3 shadow-md'>
			<nav className='navbar container flex-rbetween'>
				<div className='logo-container'>
					<h3 className='text-light'>LOGO</h3>
				</div>
				<div className="nav__links">
					<NavLink to='/' className='nav__link'>Home</NavLink>
					<NavLink to='/add-post' className='nav__link'>Add Post</NavLink>
				</div>
			</nav>
		</header>
	)
}

export default Navbar
