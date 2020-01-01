import React, { useState } from 'react';
import classes from './UserInput.module.css';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import searchTextAsync from '../../store/actions/searchText';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const UserInput = props => {

    return <div className={classes.UserInput}>
        
        <h3 className={classes.Header}
        style={{
            color: props.pallete.userInputText
        }}
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
            }}
            autoFocus={true}
            onChange={event => props.onTextUpdated(event.target.value)}> 
            </TextareaAutosize>

            <button className={classes.CheckButton}
            onClick={() => props.onSearchText(props.text, props.numWords)}
            style={{
                color: props.pallete.userInputText,
                borderColor: props.pallete.userInputText
            }}>CHECK</button>
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete,
        text: state.userInput.text,
        numWords: state.userInput.numWords
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTextUpdated: text => dispatch({type: actionTypes.UPDATE_TEXT, text: text}),
        onSearchText: (text, numWords) => dispatch(searchTextAsync(text, numWords))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
