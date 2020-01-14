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

const Tutorial = props => {
    console.log(props.tutorialModalOpen);


    return <Dialog
    open={props.tutorialModalOpen}
    onClose={props.onToggleModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>

        <DialogContent
        style={{

        }}
        >
            <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
            </DialogContentText>

        </DialogContent>


        <DialogActions>

        <button onClick={props.onToggleModal} color="primary">
            Back
        </button>

        <button onClick={props.onToggleModal} color="primary" autoFocus>
            Next
        </button>
        </DialogActions>


  </Dialog>
}

const mapStateToProps = state => {
    return {
        tutorialModalOpen: state.tutorial.modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleModal: () => dispatch({type: actionTypes.TOGGLE_TUTORIAL_MODAL})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial)
