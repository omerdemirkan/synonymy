import React, {useState} from 'react';
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

const imageStyle = {
    width: '100%',
    maxWidth: '550px'
}

const content = [
    {
        image: <span className={classes.ImageBox}><img src={img1} style={imageStyle}/></span>,
        description: 'Once you are close to your final draft, paste your essay in the text field.'
    },
    {
        image: <div className={classes.ImageBox}><img src={img2} style={imageStyle}/></div>,
        description: `Click on CHECK, I'll search through your essay and find overused words.`
    },
    {
        image: <span className={classes.ImageBox}><img src={img3} style={imageStyle}/></span>,
        description: 'Words I find to be overused will appear. Click on one to see its synonyms.'
    },
    {
        image: <div className={classes.ImageBox}><img src={img4} style={imageStyle}/></div>,
        description: `The word's synonyms will appear and all instances will be highlighted`
    },
    {
        image: <span className={classes.ImageBox}><img src={img5} style={imageStyle}/></span>,
        description: `You can choose to ignore a word if you don't find it particularly helpful`
    },
]

const Tutorial = props => {
    const [stage, setStage] = useState(0);

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

    return <Dialog
    fullWidth={true}
    open={props.tutorialModalOpen}
    onClose={props.onToggleModal}
    >
        <CloseRoundedIcon onClick={props.onToggleModal} className={classes.CloseIcon}/>
        <DialogTitle style={{backgroundColor: '#DFE6EC'}}>{"How do I use Synonymy?"}</DialogTitle>

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
        >
            Back
        </button>

        <button onClick={nextButtonClickedHandler}
        disabled={stage === content.length - 1}
        
        >
            Next
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
