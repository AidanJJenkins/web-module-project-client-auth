import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axiosWithAuth from '../api/axiosWithAuth'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialFormValues = {
  name: '',
  age: '',
  email: ''
}

export default function Friends(props) {
  const classes = useStyles();
 
  const [formValues, setFormValues] = useState(initialFormValues)
  const [friends, setFriends] = useState([])
  const [friendsLength, setFriendsLength] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const getFriends = () => {
    setIsLoading(true)
    axiosWithAuth()
        .get('/friends')
        .then(res => {
            setFriends(res.data)
            setFriendsLength(res.data.length)
            console.log(friendsLength)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getFriends()
}, [])

  const onChange = (e) => {
    setFormValues({
        ...formValues,
        [e.target.name]: e.target.value
    })
}

const handleSubmit = (e) => {
  e.preventDefault()
  let newFriend = {
    id: (friendsLength + 1),
    name: formValues.name,
    age: formValues.age,
    email: formValues.email
  }

  axiosWithAuth()
    .post('/friends', newFriend)
    .then(res => setFriends(res.data))
    .catch(err => console.log(err))
    setFormValues(initialFormValues)
    props.history.push('/friends')
} 

const handleLogOut = () => {
  axiosWithAuth()
            .post('/logout')
            .then(res=> {
                localStorage.removeItem("token");
                props.history.push('/');
            });
}

if(isLoading){
  return (<div>Loading friends...</div>)
} else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Friends
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={formValues.name}
              onChange={onChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              autoComplete="age"
              value={formValues.age}
              onChange={onChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={formValues.email}
              onChange={onChange}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add Friend
            </Button>
          </form>
        </div>
        {friends.map(friend => {
                    return(
                        <div id={friend.id}>
                            <h2>{friend.name}</h2>
                            <h3>{friend.age}</h3>
                            <p>{friend.email}</p>
                        </div>
                    )
                })}

          <Button
              onClick={handleLogOut}
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Log Out
          </Button>
      </Container>
    );
  }}