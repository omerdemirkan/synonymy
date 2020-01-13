import React, {useEffect, useState} from 'react';
import classes from './Inspect.module.css';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import updateSearchAsync from '../../store/actions/updateSearch';

// Material UI
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const Inspect = props => {

    const [ignoreModal, setIgnoreModal] = useState(false);

    useEffect(() => {
        if (props.numWords < 200 && props.word) {
            props.onResetInspect();
        }
    }, [props.numWords]);

    const ignoreButtonClickedHandler = () => {
        props.onResetInspect();
        props.onAddIgnore(props.word);
        setIgnoreModal(true);
    }

    const undoButtonClickedHandler = () => {
        props.onRemoveIgnore();
        setIgnoreModal(false);
    }

    const neuBorder = props.darkMode ? {
        boxShadow: 'inset 4px 4px 10px rgba(0, 0, 0, 0.18), inset -4px -4px 10px rgba(255, 255, 255, 0.015)'
    }
    : {
        boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.08), inset -3px -3px 6px rgba(255, 255, 255, 0.5)'
    }

    

    if (!props.word) {
        return <Snackbar
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
        }}
        open={ignoreModal}
        autoHideDuration={6000}
        onClose={() => setIgnoreModal(false)}
        message={props.ignoredWords[props.ignoredWords.length - 1] + ' is ignored for this visit.'}
        action={
        <>
            <Button key="undo" color="secondary" size="small" onClick={undoButtonClickedHandler}>
            UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setIgnoreModal(false)}>
            <CloseIcon fontSize="small" />
            </IconButton>
        </>
        }
        />;
    } else if (props.numWords < 200) {
        return null;
    }


    return <div className={classes.Inspect} id="inspect">
        <div
        style={{
            color: props.pallete.userInputText,
            ...neuBorder
        }} className={classes.InspectBox}>
            <CloseRoundedIcon onClick={() => props.onResetInspect()} className={classes.CloseIcon}/>
            
            {props.synonyms ? 
                <>
                    <p className={classes.WordSentence}>Possible alternatives for <bold className={classes.Word}>{props.word}</bold>: </p>
                    <p className={classes.Synonyms}>{props.synonyms.join(', ')}</p>
                </>
            : <h3 className={classes.NotFoundMessage}>Sorry! Couldn't find synonyms for {props.word}</h3>}

            <button 
            className={classes.IgnoreButton}
            onClick={ignoreButtonClickedHandler}>
                IGNORE
            </button>
        </div>


    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete,
        word: state.inspect.word,
        loadedSynonyms: state.userInput.loadedSynonyms,
        synonyms: state.inspect.synonyms,
        numWords: state.userInput.numWords,
        overused: state.userInput.overused,
        darkMode: state.pallete.darkMode,
        text: state.userInput.text,
        ignoredWords: state.ignore.words
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onResetInspect: () => dispatch({type: actionTypes.RESET_INSPECT}),
        onAddIgnore: ignoredWord => dispatch({type: actionTypes.ADD_IGNORE, word: ignoredWord}),
        onRemoveIgnore: () => dispatch({type: actionTypes.REMOVE_IGNORE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspect);
