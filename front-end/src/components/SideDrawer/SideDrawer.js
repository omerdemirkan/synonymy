import React from 'react';
import classes from './SideDrawer.module.css'
import DarkModeSwitch from '../../components/UI/DarkModeSwitch/DarkModeSwitch';
import { connect } from 'react-redux';
import AnchorLink from 'react-anchor-link-smooth-scroll';

function SideDrawer(props) {

    const themeModifier = {
        backgroundColor: props.pallete.sidedrawer, 
        color: props.pallete.navbarText
    }

    const buttonClickedHandler = () => {
        props.buttonClicked();
        
    }

    return <div className={classes.SideDrawer}
    style={!props.open ? themeModifier : {transform: 'translate(0)', transition: '0.2s ease', ...themeModifier}}
    >
        <span className={classes.Switch}>
            <DarkModeSwitch/>
        </span>
        <ul className={classes.ListBox}>
            <li className={classes.ListItem}>
                <button 
                className={classes.ListButton} 
                style={{color: props.pallete.navbarText, borderColor: props.pallete.navbarText}}
                onClick={buttonClickedHandler}>
                    <AnchorLink className={classes.Link} href='#about'>About</AnchorLink>
                </button>
            </li>
            <li className={classes.ListItem}>
                <button 
                className={classes.ListButton} 
                style={{color: props.pallete.navbarText, 
                borderColor: props.pallete.navbarText}}
                onClick={buttonClickedHandler}>
                    <AnchorLink className={classes.Link} href='#tutorial'>Tutorial</AnchorLink>
                </button>
            </li>
        </ul>
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete
    }
}

export default connect(mapStateToProps)(SideDrawer);
