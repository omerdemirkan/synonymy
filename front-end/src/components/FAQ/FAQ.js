import React, { useEffect } from 'react';
import classes from './FAQ.module.css';
import { connect } from 'react-redux';

function FAQ(props) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const neuBorder = props.darkMode ? {
        boxShadow: 'inset 4px 4px 10px rgba(0, 0, 0, 0.18), inset -4px -4px 10px rgba(255, 255, 255, 0.015)'
    }
    : {
        boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.08), inset -3px -3px 6px rgba(255, 255, 255, 0.5)'
    }
    return <div className={classes.FAQ}
    style={{backgroundColor: props.pallete.backgroundMain, color: props.pallete.userInputText}}>
        <h1 className={classes.MainHeader}>Frequently asked questions</h1>

        <div className={classes.MainBox} style={neuBorder}>

            <div className={classes.Section}>
                <h2 className={classes.Question}>What dialects are supported?</h2>
                <p className={classes.Answer}>Currently, Synonymy only supports <bold>American English</bold>. Other dialects can be checked; however, this may lead to certain words being scored unpredictably or ignored altogether. Users with other dialects are encouraged to take suggestions with a grain of salt.</p>
            </div>

            <div className={classes.Section}>
                <h2 className={classes.Question}>Does Synonymy check for spelling?</h2>
                <p className={classes.Answer}>No. Synonymy is intended to be used with a near-final draft. This means that grammar checks and stylistic editing should be done beforehand. It is most useful as the last step before turning in your essay.</p>
            </div>

            <div className={classes.Section}>
                <h2 className={classes.Question}>Why is there a 200-word minimum?</h2>
                <p className={classes.Answer}>A small sample size of words causes unpredictable results in the search, making it more confusing than helpful.</p>
            </div>

            <div className={classes.Section}>
                <h2 className={classes.Question}>Why is it misinterpreting some words?</h2>
                <p className={classes.Answer}>Synonymy is currently unable to check for the context. If the synonyms for a particular word aren't helpful, feel free to click <bold>IGNORE</bold>, and you won't see those words until your next visit.</p>
            </div>

        </div>
    </div>
}


const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete,
        darkMode: state.pallete.darkMode
    }
}

export default connect(mapStateToProps)(FAQ);
