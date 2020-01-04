import React from 'react';
import classes from './Main.module.css';
import { connect } from 'react-redux';

const main = props => {
    return <div className={classes.Main} 
    style={{backgroundColor: props.pallete.backgroundMain}}>
        
        <h3 className={classes.Header}
        style={{
            color: props.pallete.userInputText
        }}>I find overused words in your essay and recommend alternatives</h3>
        
        {props.children}
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete
    }
}

export default connect(mapStateToProps)(main);