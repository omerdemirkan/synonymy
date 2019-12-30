
import React from 'react';
import classes from './DarkModeSwitch.module.css';

// Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';

// Material UI
import Switch from '@material-ui/core/Switch';
import NightsStayRoundedIcon from '@material-ui/icons/NightsStayRounded';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';

const darkModeSwitch = props => {
    return <span>
        <WbSunnyRoundedIcon 
        fontSize="small" 
        className={classes.SunIcon}
        style={props.darkMode ? {opacity: '.5'}: null}
        />

        <Switch
        checked={props.darkMode}
        onChange={props.toggleDarkMode}
        color="default"
        className={classes.Switch}
        style={props.darkMode ? {color: '#444'} : {color: '#eee'}}
        />

        <NightsStayRoundedIcon 
        fontSize="small" 
        className={classes.MoonIcon}
        style={!props.darkMode ? {opacity: '.5'}: null}
        />

    </span>
}

const mapStateToProps = state => {
    return {
        darkMode: state.pallete.darkMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDarkMode: () => dispatch({type: actionTypes.TOGGLE_PALLETE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(darkModeSwitch);
