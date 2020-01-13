import React from 'react';
import { connect } from 'react-redux';
import classes from './Footer.module.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const Footer = props => {
    return <div 
    className={classes.Footer}
    style={{color: props.pallete.navbarText}}
    >
        <div className={classes.DarkModeBackdrop} style={props.darkMode ? {opacity: '1'} : {}}></div>
        <div className={classes.InfoBox}>
            <h3 className={classes.NameYear}>Omer Demirkan {new Date().getFullYear()}</h3>
            <div className={classes.Icons}>

                <a style={{color: props.pallete.navbarText}} 
                href="https://www.linkedin.com/in/omer-demirkan" target="_blank">
                    <LinkedInIcon className={classes.LinkIcon}/>
                </a>

                <a style={{color: props.pallete.navbarText}} 
                href="https://github.com/omerdemirkan" target="_blank">
                    <GitHubIcon className={classes.LinkIcon}/>
                </a>
                
                <a style={{color: props.pallete.navbarText}} 
                href="mailto:omerfarukpiano@gmail.com">
                    <MailOutlineIcon className={classes.LinkIcon}/>
                </a>
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

export default connect(mapStateToProps)(Footer)