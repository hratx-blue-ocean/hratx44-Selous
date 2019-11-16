import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button, Card, CardActions, CardContent, CssBaseline, Typography, makeStyles, Container,
} from '@material-ui/core';
import addGoalAction from '../redux/actions/actions.js';
import incrementGoalAction from '../redux/actions/actions.js';
import decrementGoalAction from '../redux/actions/actions.js';
import getGoalsAction from '../redux/actions/actions.js';

const mapStateToProps = (state) => ({
  addGoal: state.addGoal,
  currentGoals: state.currentGoals,
});

const useStyles = makeStyles((theme) => ({
  titleCard: {
    backgroundColor: '#9F6CB7',
  },
  titleCardContent: {
    textAlign: 'center',
  },
  cardFooter: {
    justifyContent: 'space-between',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    textAlign: 'center',
    padding: '12px 0 0 0',
  },
  button1: {
    justifySelf: 'center',
    backgroundColor: '#9F6CB7',
    minWidth: '100%',
    padding: '0',
  },
  button2: {
    fontSize: '14px',
  },
  goalsContainer: {
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: '#9F6CB7',
    margin: '20px',
  },
  buttonContainer: {
    padding: '0',
  },
}));

// const currentGoals = useEffect

const Goals = ({ addGoal, currentGoals, dispatch }) => {
  const classes = useStyles();
  useEffect(() => {
    dispatch(getGoalsAction.getGoalsAction());
  });

  if (addGoal) {
    return <div>This is a test div</div>;
  }
  return (currentGoals.length > 0 && (
    <>
      <CssBaseline />
      <main>
        <Container className={classes.goalsContainer} maxWidth="xs">
          <Card className={classes.titleCard}>
            <CardContent className={classes.titleCardContent}>
              <Typography variant="h3" component="h3">
                Goals
              </Typography>
            </CardContent>
          </Card>
          <hr style={{ margin: '20px 10px' }} />
          {currentGoals.map((currentGoal) => (
            <Card key={currentGoal.id} className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" component="h2">
                  {`${currentGoal.progress} / `}
                  {currentGoal.goal}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardFooter}>
                <Button
                  size="small"
                  className={classes.button2}
                  onClick={() => dispatch(decrementGoalAction.decrementGoalAction())}
                >
                  -
                </Button>
                <Typography>
                  {currentGoal.title}
                </Typography>
                <Button
                  size="small"
                  className={classes.button2}
                  onClick={() => dispatch(incrementGoalAction.incrementGoalAction())}
                >
                  +
                </Button>
              </CardActions>
            </Card>
          ))}
          <CardActions className={classes.buttonContainer}>
            <Button
              variant="contained"
              size="large"
              className={classes.button1}
              onClick={() => dispatch(addGoalAction.addGoalAction())}
            >
              +
            </Button>
          </CardActions>
        </Container>
      </main>
    </>
  ));
};

export default connect(mapStateToProps)(Goals);
