import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/react-marvel-site">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink to="/react-marvel-site" style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})}>Characters</NavLink></li>
                    /
                    <li><NavLink to="/react-marvel-site/comics" style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})}>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;