import React from 'react';
import classes from './UserInput.module.css';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import searchTextAsync from '../../store/actions/searchText';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const UserInput = props => {

    return <div className={classes.UserInput}>
        
        <h3 className={classes.Header}
        style={{
            color: props.pallete.userInputText
        }}>I find overused words in your essay and recommend alternatives</h3>
        <div className={classes.TextFieldSynonymBox}>
            <div className={classes.TextFieldBox}
            style={{
                borderColor: props.pallete.userInputText
            }}>
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
                            <tr>
                                <td>WORD</td>
                                <td>FOUND</td>
                                <td>SCORE</td>
                            </tr>
                        </thead>
                        <br/>
                        <tbody>
                            {props.overused.map((element, index) => {
                                if (index < 30) {
                                    const synonyms = Object.keys(element.synonyms).map(type=> {
                                        return <li>{type}: {element.synonyms[type].join(', ')}</li>
                                    });
                                    return <tr key={element.word}>
                                        <td className={classes.NameFieldItem}>
                                            {element.word}
                                            <ul className={classes.Synonym}
                                            style={{
                                                backgroundColor: props.pallete.backgroundMain,
                                                borderColor: props.pallete.userInputText
                                            }}>
                                                {synonyms}
                                            </ul>
                                        </td>
                                        <td>{element.numFound}</td>
                                        <td>{Math.floor(element.multiplier)}</td>
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
