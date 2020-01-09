import React from 'react';
import classes from './Inspect.module.css';
import {connect} from 'react-redux';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import * as actionTypes from '../../store/actions/actionTypes';

const Inspect = props => {

    if (!props.word || props.numWords < 200) {
        return null;
    }

    return <div className={classes.Inspect} id="inspect">
        <div
        style={{
            backgroundColor: props.pallete.textArea,
            color: props.pallete.userInputText,
            // borderColor: props.pallete.userInputText
        }} className={classes.InspectBox}>
        <CloseRoundedIcon onClick={() => props.onResetInspect()} className={classes.CloseIcon}/>
        
        {props.synonyms ? 
            <>
                <p className={classes.WordSentence}>Possible alternatives for <bold className={classes.Word}>{props.word}</bold>: </p>
                <p className={classes.Synonyms}>{props.synonyms.join(', ')}</p>
            </>
        : <h3 className={classes.NotFoundMessage}>Sorry! Couldn't find synonyms for {props.word}</h3>}
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete,
        word: state.inspect.word,
        synonyms: state.inspect.synonyms,
        numWords: state.userInput.numWords
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetInspect: () => dispatch({type: actionTypes.RESET_INSPECT})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspect);
