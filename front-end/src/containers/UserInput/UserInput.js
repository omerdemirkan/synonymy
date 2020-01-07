import React, { useState, useEffect } from 'react';
import classes from './UserInput.module.css';
import useDebounce from '../Hooks/useDebounce';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import searchTextAsync from '../../store/actions/searchText';
import updateTextAsync from '../../store/actions/updateText';
import applyHighlight from '../../helper/applyHightlight';
import AnchorLink from 'react-anchor-link-smooth-scroll';

// Material UI
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const UserInput = props => {

    const [clickWordModal, setClickWordModal] = useState(false);
    const [userIsNew, setUserIsNew] = useState(false);

    // On mount: sets whether or not the user is new

    useEffect(() => {
        const initialText = localStorage.getItem('text');
        if (!initialText) {
            setUserIsNew(true);
        };
    }, []);

    // text that updates after the user stops typing (1 second)
    const debouncedText = useDebounce(props.text, 1000);

    useEffect(() => {
        if (debouncedText && props.overused.length > 0) {
            props.onUpdateText(props.text, props.numWords, props.loadedSynonyms);
        }
    }, [debouncedText]);

    const checkButtonClickedHandler = () => {
        if (props.overused.length === 0) {
            props.onSearchText(props.text, props.numWords);
            if (userIsNew) {
                setClickWordModal(true);
            }
        } else {
            props.onUpdateText(props.text, props.numWords, props.loadedSynonyms);
        }
    }

    const wordClickedHandler = word => {
        const synonyms = props.loadedSynonyms[word];
        props.onSetInspect(word, synonyms); 
        window.scrollTo(0, 0);
    }

    return <div className={classes.UserInput} id="userinput">
        <div className={classes.TextFieldSynonymBox}>

        {props.overused.length > 0 ? 

                <aside className={classes.SynonymLane}>

                    <div 
                    className={classes.SynonymBox}
                    style={{
                        borderColor: props.pallete.userInputText,
                        backgroundColor: '',
                        color: props.pallete.userInputText
                    }}>

                        <table className={classes.SynonymTable}>
                            <thead >
                                <tr style={{
                                    textAlign: 'center'
                                }}>
                                    <td>WORD</td>
                                    <td>FOUND</td>
                                    <td className={classes.SeverityHeader}>
                                        SCORE
                                    </td>
                                </tr>
                            </thead>
                            <br/>
                            <tbody>
                                {props.overused.map((element, index) => {
                                    return <tr key={element.word}>
                                        <td 
                                        className={classes.NameFieldItem} 
                                        onClick={() => wordClickedHandler(element.word)}
                                        style={props.inspectedWord === element.word ? {opacity: '1', fontWeight: '500'} : null}>
                                            {element.word}
                                        </td>
                                        <td
                                        style ={{
                                            textAlign: "center"
                                        }}
                                        >{element.numFound}</td>
                                        <td
                                        style ={{
                                            textAlign: "center"
                                        }}
                                        >{Math.floor((element.numFound / props.numWords) / element.expectedFrequency)}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                            <div className={classes.Stats}>
                                <p className={classes.Stat}>{props.numWords} words</p>
                                <p className={classes.Stat}>{props.numChars} characters</p>
                            </div>
                            

                    </div>
                </aside>
            : null}

            <div className={classes.TextFieldBox}
            style={{
                borderColor: props.pallete.userInputText
            }}>
                {props.inspectedWord ? 
                    <div className={classes.HighlightText}>
                            {applyHighlight(props.text, props.inspectedWord, {
                                color: props.pallete.userInputText,
                                backgroundColor: props.pallete.userInputTextHighlight
                            })}
                    </div>
                : null}
                
                <TextareaAutosize
                spellcheck="false"
                placeholder="Paste your essay here"
                className={classes.TextField}
                maxLength="100000"
                value={props.text}
                style={{
                    color: props.pallete.userInputText,
                    zIndex: '5'
                }}
                autoFocus={true}
                onChange={event => props.onTextUpdated(event.target.value)}>
                    
                </TextareaAutosize>
                

                <AnchorLink href="#userinput" offset="200">
                    <button className={classes.CheckButton}
                    onClick={checkButtonClickedHandler}
                    disabled={!props.changed}
                    style={{
                        color: props.pallete.userInputText
                    }}>CHECK</button>
                </AnchorLink>
            </div>
        </div>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={clickWordModal}
        autoHideDuration={6000}
        onClose={() => setClickWordModal(false)}
        message="Click on a word to see its synonyms"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => setClickWordModal(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete,
        text: state.userInput.text,
        numWords: state.userInput.numWords,
        numChars: state.userInput.numChars,
        overused: state.userInput.overused,
        inspectedWord: state.inspect.word,
        loading: state.userInput.loading,
        changed: state.userInput.changed,
        numWords: state.userInput.numWords,
        loadedSynonyms: state.userInput.loadedSynonyms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTextUpdated: text => dispatch({type: actionTypes.UPDATE_TEXT, text: text}),
        onSearchText: (text, numWords) => dispatch(searchTextAsync(text, numWords)),
        onSetInspect: (word, synonyms) => dispatch({type: actionTypes.SET_INSPECT, word: word, synonyms: synonyms}),
        onUpdateText: (text, numWords, overusedList) => dispatch(updateTextAsync(text, numWords, overusedList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
