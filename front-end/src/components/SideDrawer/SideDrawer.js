import React from 'react';
import classes from './SideDrawer.module.css'
import DarkModeSwitch from '../../components/UI/DarkModeSwitch/DarkModeSwitch';
import { connect } from 'react-redux';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import * as actionTypes from '../../store/actions/actionTypes';
import { Link } from 'react-router-dom';

function SideDrawer(props) {
    console.log(window.location.pathname);

    const themeModifier = {
        backgroundColor: props.pallete.sidedrawer, 
        color: props.pallete.navbarText
    }

    const tutorialClickedHandler = () => {
        props.buttonClicked();
        props.onToggleModal();
    }

    return <div className={classes.SideDrawer}
    style={!props.open ? themeModifier : {transform: 'translate(0)', transition: '0.2s ease', ...themeModifier}}
    >
        <span className={classes.Switch}>
            <DarkModeSwitch/>
        </span>
        <ul className={classes.ListBox}>

            {/* The function of this button is to scroll a mobile user all the way down to the about section.
            It isn't seen on another page. */}
            {window.location.pathname === '/' ? 
                <li className={classes.ListItem}>
                    <button 
                    className={classes.ListButton} 
                    style={{color: props.pallete.navbarText, borderColor: props.pallete.navbarText}}
                    onClick={() => props.buttonClicked()}>
                        <AnchorLink className={classes.Link} href='#about'>About</AnchorLink>
                    </button>
                </li>
            : null}
            
            <li className={classes.ListItem}>
                <button 
                className={classes.ListButton} 
                style={{color: props.pallete.navbarText, 
                borderColor: props.pallete.navbarText}}
                onClick={tutorialClickedHandler}>
                    Tutorial
                </button>
            </li>
            <li className={classes.ListItem}>
                <button 
                className={classes.ListButton} 
                style={{color: props.pallete.navbarText, borderColor: props.pallete.navbarText}}
                onClick={() => props.buttonClicked()}>
                    <Link className={classes.Link} to="/faq">FAQs</Link>
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

const mapDispatchToProps = dispatch => {
    return {
        onToggleModal: () => dispatch({type: actionTypes.TOGGLE_TUTORIAL_MODAL})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
