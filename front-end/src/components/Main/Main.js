import React from 'react';
import classes from './Main.module.css';
import { connect } from 'react-redux';

const main = props => {
    return <div className={classes.Main} 
    style={{backgroundColor: props.pallete.backgroundMain}}>
        {props.children}
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete
    }
}

export default connect(mapStateToProps)(main);