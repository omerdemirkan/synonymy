import React, { useState } from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import DarkModeSwitch from '../../components/UI/DarkModeSwitch/DarkModeSwitch';

const Navbar = props => {
    // Determines whether or not the side-drawer is open, also affects
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    
    
    return <nav className={classes.Navbar}
    style={{
        backgroundColor: props.pallete.navbar, 
        color: props.pallete.navbarText
    }}
    >
        <h2 className={classes.Logo}>Synonymy</h2>
        <ul className={classes.ListBox}>

            <li>
                <DarkModeSwitch/>
            </li>

            <li className={classes.ListItem}>About</li>
            <li className={classes.ListItem}>Tutorial</li>
        </ul>
    </nav>
}


const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete
    }
}

export default connect(mapStateToProps)(Navbar);