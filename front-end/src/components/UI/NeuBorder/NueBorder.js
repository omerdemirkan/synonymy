import React from 'react';
import { connect } from 'react-redux';

const NueBorder = props => {

    let shadow = {
        boxShadow: '3px 3px 6px rgb(0,0,0,0.2), -3px -3px 6px  rgba(255,255,255, 1)'
    };

    if (props.darkMode) {
        shadow = {
            boxShadow: '3px 3px 6px rgb(0,0,0,0.5), -3px -3px 6px  rgba(255,255,255, 0.1)'
        }
    }
    return <span 
    className={props.className}
    style={{...shadow, ...props.style}}
    >
        {props.children}
    </span>
}

const mapStateToProps = state => {
    return {
        darkMode: state.pallete.darkMode
    }
}

export default connect(mapStateToProps)(NueBorder);