import React from 'react';
import classes from './UserInput.module.css';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import searchTextAsync from '../../store/actions/searchText';
import applyHighlight from '../../helper/applyHightlight';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const UserInput = props => {

    

    return <div className={classes.UserInput} id="userinput">
        <div className={classes.TextFieldSynonymBox}>

        {props.overused.length > 0 ? 
                <aside className={classes.SynonymBox}>
                    <table className={classes.SynonymTable}
                    style={{
                        borderColor: props.pallete.userInputText,
                        color: props.pallete.userInputText
                    }}>
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
                                if (index < 30) {
                                    return <tr key={element.word}>
                                        <td 
                                        className={classes.NameFieldItem} 
                                        onClick={() => {props.onSetInspect(element.word, element.synonyms); window.scrollTo(0, 0);}}
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
                                        >{element.multiplier}</td>
                                    </tr>
                                }
                            })}
                        </tbody>
                    </table>
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
                    onClick={() => props.onSearchText(props.text, props.numWords)}
                    disabled={!props.changed}
                    style={{
                        color: props.pallete.userInputText
                    }}>CHECK</button>
                </AnchorLink>
            </div>
        </div>
        
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete,
        text: state.userInput.text,
        numWords: state.userInput.numWords,
        overused: state.userInput.overused,
        inspectedWord: state.inspect.word,
        loading: state.userInput.loading,
        changed: state.userInput.changed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTextUpdated: text => dispatch({type: actionTypes.UPDATE_TEXT, text: text}),
        onSearchText: (text, numWords) => dispatch(searchTextAsync(text, numWords)),
        onSetInspect: (word, synonyms) => dispatch({type: actionTypes.SET_INSPECT, word: word, synonyms: synonyms})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
