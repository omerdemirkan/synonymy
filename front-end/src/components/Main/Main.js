import React from 'react';
import classes from './Main.module.css';
import Background1 from '../../images/Background/background1.svg';

const main = props => {
    return <div className={classes.Main}>
        <img src={Background1} className={classes.Background1}/>
        {props.children}
    </div>
}

export default main;