import React from 'react';
import classes from './Navbar.module.css';

const navbar = () => {
    return <nav className={classes.Navbar}>
        <h2 className={classes.Logo}>Synonymy</h2>
        <ul className={classes.ListBox}>
            <li className={classes.ListItem}>About</li>
            <li className={classes.ListItem}>Tutorial</li>
        </ul>
    </nav>
}

export default navbar;