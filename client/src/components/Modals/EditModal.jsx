/* eslint-disable max-len */
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';

// import {
//   Typography,
//   Fab,
//   Box,
// } from '@material-ui/core';
// import AddCircleIcon from '@material-ui/icons/AddCircleOutlined';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import Modal from '@material-ui/core/Modal';
// import { connect } from 'react-redux';

// const useStyles = makeStyles(({
//   root: {
//     padding: 10,
//     paddingTop: 18,
//     width: '549px',
//     height: '351px',
//     borderRadius: '8px',
//     fontFamily: 'Arial',
//     fontSize: '18px',
//     background: '#F2F2F2',
//     border: 2,
//     borderColor: '#9F6CB7',
//     borderStyle: 'solid',
//   },
//   notes: {
//     borderRadius: '8px',
//     padding: 10,
//     background: '#FFFFFF',
//     width: '447px',
//     height: '293px',
//     borderWidth: 1,
//     borderColor: 'purple',
//     borderStyle: 'solid',
//     boxShadow: 5,
//   },
//   next: {
//     borderRadius: '8px',
//     padding: 10,
//     background: '#FFFFFF',
//     width: '447px',
//     borderWidth: 1,
//     borderColor: 'purple',
//     borderStyle: 'solid',
//     boxShadow: 5,
//   },
//   do: {
//     color: '#69B92A',
//     fontSize: 54,
//     stroke: 'black',
//     strokeWidth: '.5px',
//   },
//   doNot: {
//     color: '#DB5C5C',
//     fontSize: 54,
//     transform: 'rotate(45deg)',
//     stroke: 'black',
//     strokeWidth: '.5px',
//   },
//   buttons: {
//     marginRight: 6,
//     float: 'right',
//     marginTop: '33%',
//   },
//   fabStuff: {
//     size: 'small',
//     marginTop: 5,
//   },
//   buttonBoi: {
//     borderRadius: 40,
//   },
//   cairo: {
//     fontFamily: 'Cairo',
//   },
// }));

// function EditDetailsModal({ setShow, show }) {
//   const classes = useStyles();
//   return (
//     <Modal
//       className={classes.bigContainer}
//       aria-labelledby="simple-modal-title"
//       aria-describedby="simple-modal-description"
//       open={show}
//     >
//       <Box className={classes.root}>
//         <Typography className={classes.cairo}>
//           Notes
//         </Typography>
//         <Box className={classes.buttons} flexDirection="column" display="flex" alignItems="flex-end">
//           <Fab onClick={() => { setShow(!show); }} className={classes.buttonBoi}>
//             <AddCircleIcon className={classes.doNot} />
//           </Fab>
//           <Fab onClick={() => { setShow(!show); }} className={classes.fabStuff}>
//             <CheckCircleIcon className={classes.do} />
//           </Fab>
//         </Box>
//         <textarea className={classes.notes} />
//       </Box>
//     </Modal>
//   );
// }

// export default connect()(EditDetailsModal);

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
/* eslint-disable prefer-const */
import {
  Typography,
  Fab,
  Box,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircleOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import { userToState, currentJobAction } from '../../redux/actions/actions.js';

const useStyles = makeStyles(({
  root: {
    padding: 10,
    paddingTop: 18,
    width: '549px',
    height: '351px',
    borderRadius: '8px',
    fontFamily: 'Arial',
    fontSize: '18px',
    background: '#F2F2F2',
    border: 2,
    borderColor: '#9F6CB7',
    borderStyle: 'solid',
  },
  notes: {
    borderRadius: '8px',
    padding: 10,
    background: '#FFFFFF',
    width: '447px',
    height: '293px',
    borderWidth: 1,
    borderColor: 'purple',
    borderStyle: 'solid',
    boxShadow: 5,
  },
  next: {
    borderRadius: '8px',
    padding: 10,
    background: '#FFFFFF',
    width: '447px',
    borderWidth: 1,
    borderColor: 'purple',
    borderStyle: 'solid',
    boxShadow: 5,
  },
  do: {
    color: '#69B92A',
    fontSize: 54,
    stroke: 'black',
    strokeWidth: '.5px',
  },
  doNot: {
    color: '#DB5C5C',
    fontSize: 54,
    transform: 'rotate(45deg)',
    stroke: 'black',
    strokeWidth: '.5px',
  },
  buttons: {
    marginRight: 6,
    float: 'right',
    marginTop: '33%',
  },
  fabStuff: {
    size: 'small',
    marginTop: 5,
  },
  buttonBoi: {
    borderRadius: 40,
  },
  cairo: {
    fontFamily: 'Cairo',
  },
}));
const mapStateToProps = (state) => ({
  user: state.userData,
  job: state.currentJob,
  displayTabs: state.displayedTabs,
});
function EditDetailsModal({
  job,
  user,
  info,
  setShow,
  show,
  dispatch,
  displayTabs,
}) {
  const classes = useStyles();
  const tabIndex = displayTabs.indexOf(info);
  let [note, setNotes] = useState('');
  const addNote = () => {
    const newInfo = {};
    newInfo.stepNotes = note;
    newInfo.stepName = info.stepName;
    newInfo.createdAt = info.createdAt;
    newInfo.isCompleted = info.isCompleted;
    if (tabIndex > -1) {
      axios.put('/db/dashboard/job/progress', {
        userId: user._id,
        jobId: job.jobId,
        progressId: tabIndex,
        progressData: newInfo,
      })
        .then(() => {
          axios.get('/db/login', {
            params: {
              userId: user._id,
            },
          })
            .then((results) => {
              console.log(results.data);
              dispatch(userToState(results.data));
              dispatch(currentJobAction({
                jobId: job.jobId,
                jobData: results.data.userJobs[job.jobId],
              }));
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('on company');
      axios.put('/db/dashboard/job/notes', {
        userId: user._id,
        jobId: job.jobId,
        notes: note,
      })
        .then(() => {
          axios.get('/db/login', {
            params: {
              userId: user._id,
            },
          })
            .then((results) => {
              dispatch(userToState(results.data));
              dispatch(currentJobAction({
                jobId: job.jobId,
                jobData: results.data.userJobs[job.jobId],
              }));
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Modal
      className={classes.bigContainer}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={show}
    >
      <Box className={classes.root}>
        <Typography className={classes.cairo}>
          Notes
        </Typography>
        <Box className={classes.buttons} flexDirection="column" display="flex" alignItems="flex-end">
          <Fab onClick={() => { setShow(!show); }} className={classes.buttonBoi}>
            <AddCircleIcon className={classes.doNot} />
          </Fab>
          <Fab onClick={() => { addNote(); setShow(!show); }} className={classes.fabStuff}>
            <CheckCircleIcon className={classes.do} />
          </Fab>
        </Box>
        <textarea
          onChange={(event) => { setNotes(note = event.target.value); }}
          placeholder={info.stepNotes}
          className={classes.notes}
        />
      </Box>
    </Modal>
  );
}

export default connect(mapStateToProps)(EditDetailsModal);
