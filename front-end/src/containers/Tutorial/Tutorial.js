import React, { useState, useEffect } from 'react';
import classes from './Tutorial.module.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

// Images
import img1 from '../../images/synonymy1.png';
import img2 from '../../images/synonymy2.png';
import img3 from '../../images/synonymy3.png';
import img4 from '../../images/synonymy4.png';
import img5 from '../../images/synonymy5.png';

const Tutorial = props => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        if (props.tutorialModalOpen) {
            setStage(0);
        }
    }, [props.tutorialModalOpen]);

    const nextButtonClickedHandler = () => {
        if (stage < 4) {
            setStage(stage + 1);
        }
    }

    const backButtonClickedHandler = () => {
        if (stage !== 0) {
            setStage(stage - 1);
        }
    }

    const imageStyle = {
        width: '100%'
    }
    
    const content = [
        {
            image: <span className={classes.ImageBox}><img src={img1} style={imageStyle} alt="Tutorial step 1"/></span>,
            description: 'Once you are close to your final draft, paste your essay in the text field.'
        },
        {
            image: <div className={classes.ImageBox}><img src={img2} style={imageStyle} alt="Tutorial step 2"/></div>,
            description: `Click on CHECK, I'll search through your essay and find overused words.`
        },
        {
            image: <span className={classes.ImageBox}><img src={img3} style={imageStyle} alt="Tutorial step 3"/></span>,
            description: 'Whatever I find will be listed in order. Click on one to see its synonyms.'
        },
        {
            image: <div className={classes.ImageBox}><img src={img4} style={imageStyle} alt="Tutorial step 4"/></div>,
            description: `The word's synonyms will appear and all instances will be highlighted`
        },
        {
            image: <span className={classes.ImageBox}><img src={img5} style={imageStyle} alt="Tutorial step 5"/></span>,
            description: `You can choose to ignore a word if you don't find it particularly helpful`
        },
    ]

    return <Dialog
    scroll={'paper'}
    fullWidth={true}
    open={props.tutorialModalOpen}
    onClose={props.onToggleModal}
    style={{overflowY: 'scroll'}}
    >
        <CloseRoundedIcon onClick={props.onToggleModal} className={classes.CloseIcon}/>
        <DialogTitle style={{backgroundColor: '#DFE6EC', textAlign: 'center'}}>{"How do I use Synonymy?"}</DialogTitle>

        <DialogContent
        style={{backgroundColor: '#DFE6EC'}}
        >
            {content[stage].image}

            <DialogContentText id="alert-dialog-description" style={{marginTop: '30px'}}>
                {content[stage].description}
            </DialogContentText>

        </DialogContent>


        <DialogActions style={{backgroundColor: '#DFE6EC'}}>

        <button 
        onClick={backButtonClickedHandler}
        disabled={stage === 0}
        className={classes.Button}
        >
            BACK
        </button>

        <button 
        onClick={nextButtonClickedHandler}
        disabled={stage === content.length - 1}
        className={classes.Button}
        >
            NEXT
        </button>
        </DialogActions>


  </Dialog>
}

const mapStateToProps = state => {
    return {
        tutorialModalOpen: state.tutorial.modal,
        pallete: state.pallete.pallete
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleModal: () => dispatch({type: actionTypes.TOGGLE_TUTORIAL_MODAL})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial)
