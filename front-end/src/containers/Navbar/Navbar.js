import React, { useState } from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import DarkModeSwitch from '../../components/UI/DarkModeSwitch/DarkModeSwitch';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Backdrop from '@material-ui/core/Backdrop';
import * as actionTypes from '../../store/actions/actionTypes';
import { NavLink } from 'react-router-dom';

const Navbar = props => {
    // Determines whether or not the side-drawer is open, also affects
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    
    return <nav className={classes.Navbar}
    style={{ 
        color: props.pallete.navbarText
    }}
    >
        <div className={classes.DarkModeBackdrop} style={props.darkMode ? {opacity: '1'} : {}}></div>
        <h2 className={classes.Logo}>
            <NavLink to="/" className={classes.Link}>Synonymy</NavLink>
            <p className={classes.Beta}>beta</p>
        </h2>
        

        {/* Desktop */}
        <ul className={classes.ListBox}>

            <li>
                <DarkModeSwitch/>
            </li>
            <li className={classes.ListItem} onClick={props.onToggleModal}>Tutorial</li>

            <li className={classes.ListItem}><NavLink to="/faq" className={classes.Link}>FAQ</NavLink></li>
        </ul>
        

        {/* Mobile */}
        <div className={classes.Burger} onClick={() => setShowSideDrawer(!showSideDrawer)}>
            <div className={showSideDrawer ? classes.Line1 : null} style={{
            backgroundColor: props.pallete.navbarText
            }}></div>
            <div className={showSideDrawer ? classes.Line2 : null} style={{
            backgroundColor: props.pallete.navbarText
            }}></div>
            <div className={showSideDrawer ? classes.Line3 : null} style={{
            backgroundColor: props.pallete.navbarText
            }}></div>
        </div>
        
        <SideDrawer open={showSideDrawer} buttonClicked={() => setShowSideDrawer(!showSideDrawer)}/>
        <Backdrop
            style={{
                zIndex: "3", top: '60px'
            }}
            open={showSideDrawer}
            onClick={() => setShowSideDrawer(!showSideDrawer)}
        ></Backdrop>
    </nav>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete,
        darkMode: state.pallete.darkMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleModal: () => dispatch({type: actionTypes.TOGGLE_TUTORIAL_MODAL})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);