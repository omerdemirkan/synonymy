import React from 'react';
import classes from './UserInput.module.css';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import searchTextAsync from '../../store/actions/searchText';
import applyHighlight from '../../helper/applyHightlight';

import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const UserInput = props => {

    return <div className={classes.UserInput}>
        <div className={classes.TextFieldSynonymBox}>
            <div className={classes.TextFieldBox}
            style={{
                borderColor: props.pallete.userInputText
            }}>
                <div className={classes.HighlightText}>{applyHighlight(props.text, 'e') }</div>
                <TextareaAutosize
                className={classes.TextField}
                maxLength="100000"
                value={props.text}
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
                                    SEVERITY
                                    <HelpOutlineRoundedIcon fontSize='small' className={classes.QuestionIcon}/>
                                </td>
                            </tr>
                        </thead>
                        <br/>
                        <tbody>
                            {props.overused.map((element, index) => {
                                if (index < 30) {
                                    return <tr key={element.word}>
                                        <td className={classes.NameFieldItem}>
                                            {element.word}
                                            <div className={classes.Synonym}
                                            style={{
                                                backgroundColor: props.pallete.backgroundMain,
                                                borderColor: props.pallete.userInputText
                                            }}>
                                                <p>Possible alternatives for <strong>{element.word}</strong>:</p>
                                                {element.synonyms.join(', ')}
                                            </div>
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
                                        >{Math.floor(element.multiplier)}</td>
                                    </tr>
                                }
                            })}
                        </tbody>
                    </table>
                </aside>
            : null}

            
        </div>
        
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete,
        text: state.userInput.text,
        numWords: state.userInput.numWords,
        overused: state.userInput.overused
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTextUpdated: text => dispatch({type: actionTypes.UPDATE_TEXT, text: text}),
        onSearchText: (text, numWords) => dispatch(searchTextAsync(text, numWords))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
