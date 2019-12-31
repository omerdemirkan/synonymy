import React from 'react';
import classes from './SideDrawer.module.css'
import DarkModeSwitch from '../../components/UI/DarkModeSwitch/DarkModeSwitch';
import { connect } from 'react-redux';

function SideDrawer(props) {
    return <div className={classes.SideDrawer}
    style={{
        backgroundColor: props.pallete.navbar, 
        color: props.pallete.navbarText
    }}>
        <span className={classes.Switch}>
            <DarkModeSwitch/>
        </span>
        <ul className={classes.ListBox}>

            <li className={classes.ListItem}>
                <button className={classes.ListButton} style={{color: props.pallete.navbarText, borderColor: props.pallete.navbarText}}>
                    About
                </button>
            </li>
            <li className={classes.ListItem}>
                <button className={classes.ListButton} style={{color: props.pallete.navbarText, borderColor: props.pallete.navbarText}}>
                    Tutorial
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
