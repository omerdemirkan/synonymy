
import React from 'react';

import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';

import Switch from '@material-ui/core/Switch';

const darkModeSwitch = props => {
    return <span>
        <Switch
        checked={props.darkMode}
        onChange={props.toggleDarkMode}
        color="default"
        style={props.darkMode ? {color: '#444'} : {color: '#eee'}}
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
