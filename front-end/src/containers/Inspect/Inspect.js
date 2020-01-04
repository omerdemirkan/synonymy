import React from 'react';
import classes from './Inspect.module.css';
import {connect} from 'react-redux';

const Inspect = props => {

    if (!props.word) {
        return null;
    }

    console.log(props.word);
    console.log(props.synonyms);
    return <div className={classes.Inspect}>
        <div
        style={{
            color: props.pallete.userInputText,
            borderColor: props.pallete.userInputText
        }} className={classes.InspectBox}>
        
        {props.synonyms ? 
            <>
                <p>Possible alternatives for <bold>{props.word}</bold></p>
                <p>{props.synonyms.join(', ')}</p>
            </>
        : <h3 className={classes.NotFoundMessage}>Sorry! Couldn't find synonyms for {props.word}</h3>}
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete,
        word: state.inspect.word,
        synonyms: state.inspect.synonyms
    }
}

export default connect(mapStateToProps)(Inspect);
