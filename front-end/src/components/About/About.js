import React from 'react';
import classes from './About.module.css';
import { connect } from 'react-redux';

function About(props) {
    const neuBorder = props.darkMode ? {

    }
    : {
        boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.08), inset -3px -3px 6px rgba(255, 255, 255, 0.5)'
    }

    return <div id="about" className={classes.About}
    style={{
        color: props.pallete.userInputText,
        backgroundColor: props.pallete.backgroundMain
    }}>
        <div className={classes.AboutBox}
        style={{
            ...neuBorder
        }}>
            <div className={classes.Section}>
                <h1 className={classes.MainHeader}>What is Synonymy?</h1>
                <p className={classes.SecondaryHeader}>Simple: I help reduce repitition in your essays.</p>
                <p className={classes.Text}>
                    I read your essay and find recurring words, 
                    compare how often it has been used to it's estimated occurance in day-to-day language, 
                    rank order them based severity and offer synonyms.
                </p>
            </div>
            
            <div className={classes.Section}>
                <h1 className={classes.MainHeader}>How does it work?</h1>
                <p className={classes.Text}>
                    After gathering a list of words used more than twice in your essay, 
                    I look for the word in a list of 97,565 unique words used in over 743 billion different places ranked from most to least used
                    collected by <a target="_blank" href="http://norvig.com/mayzner.html" style={{color: props.pallete.userInputText}}>Peter Norvig</a> from data provided by Google Books.
                </p>
                <p className={classes.Text}>
                    Much like the mass of stars and populations of cities, the use of words follow a pareto distribution. 
                    In fact, I use the word's ranking in this list to come up with an estimate of the expected ratio of use.
                    I then compare the actual ratio to the expected ratio to come up with a sort of "ratio of ratios" which I call the word's score.
                    This score is used as a general benchmark for how overused I perceive a word to be.
                    Finally, I take the most overused words and gather all the possible synonyms I can find and offer them.
                </p>
            </div>
            <div id="tutorial" className={classes.Section}>
                <h1 className={classes.MainHeader}>How do I use it?</h1>
                <p className={classes.Text}>
                    Once you feel you are close to a final draft, paste your essay in the text field and click CHECK. 
                    After some thinking, I will list what I believe to be your most overused words in a sidebar.
                </p>

                <p className={classes.Text}>
                    To get synonyms of a particular word, click on the word in the sidebar. 
                    All of the synonyms I can find will be at the top of the screen and all instances of the word will be highlighted for you.
                </p>
                
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

export default connect(mapStateToProps)(About);


