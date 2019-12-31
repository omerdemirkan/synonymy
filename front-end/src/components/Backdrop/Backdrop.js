import React from 'react';
import classes from './Backdrop.module.css';

export default function Backdrop(props) {
    return <div 
    className={classes.Backdrop} 
    style={!props.show ? {display: 'none'} : null}>
        
    </div>
}
