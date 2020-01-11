import React, { useState } from 'react';
import classes from './Navbar.module.css';
import { connect } from 'react-redux';
import DarkModeSwitch from '../../components/UI/DarkModeSwitch/DarkModeSwitch';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
// import Backdrop from '../../components/Backdrop/Backdrop';
import Backdrop from '@material-ui/core/Backdrop';
import AnchorLink from 'react-anchor-link-smooth-scroll';

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

        {/* Desktop */}
        <ul className={classes.ListBox}>

            <li>
                <DarkModeSwitch/>
            </li>

            <li className={classes.ListItem}><AnchorLink className={classes.Link} href='#about'>About</AnchorLink></li>
            <li className={classes.ListItem}><AnchorLink className={classes.Link} href='#tutorial'>Tutorial</AnchorLink></li>
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
        pallete: state.pallete.pallete
    }
}

export default connect(mapStateToProps)(Navbar);