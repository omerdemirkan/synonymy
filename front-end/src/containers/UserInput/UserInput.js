import React from 'react';
import classes from './UserInput.module.css';
import { connect } from 'react-redux';

import Textarea from 'react-expanding-textarea'

const UserInput = () => {
    return <div className={classes.UserInput}>
        <h3 className={classes.Header}>I find overused words in your essay and recommend alternatives</h3>
        <div className={classes.TextFieldBox}>
            <Textarea
                className={classes.TextField}
                maxLength="10000"
                autoFocus
            />
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
        pallete: state.pallete.pallete
    }
}

export default connect(mapStateToProps)(UserInput);
