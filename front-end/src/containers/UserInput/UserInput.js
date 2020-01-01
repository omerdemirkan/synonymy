import React from 'react';
import classes from './UserInput.module.css';
import { connect } from 'react-redux';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const UserInput = props => {
    return <div className={classes.UserInput}>
        <h3 className={classes.Header}
        style={{color: props.pallete.userInputText}}
        >I find overused words in your essay and recommend alternatives</h3>
        <div className={classes.TextFieldBox}
        style={{
            borderColor: props.pallete.userInputText
        }}>
            <TextareaAutosize
            className={classes.TextField}
            maxLength="10000"
            style={{
                color: props.pallete.userInputText
            }}> 
            </TextareaAutosize>

            <button className={classes.CheckButton}
            style={{
                color: props.pallete.userInputText,
                borderColor: props.pallete.userInputText
            }}>Check</button>
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete
    }
}

export default connect(mapStateToProps)(UserInput);
