import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import TextField from '@material-ui/core/TextField'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteComment, addComment } from '../../redux/actions/eventActions'

const useStyles = makeStyles({
  comments: {
    marginTop: '3rem',
    '& h3': {
      marginBottom: '2rem'
    }
  },
  comment: {
    margin: '2rem 0',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #eee'
  },
  commentUser: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '3rem'
  },
  commentUserAvatar: {
    width: '6rem',
    height: '6rem',
    marginRight: '2rem'
  },
  commentIcon: {
    marginLeft: 'auto',
    width: '2.6rem',
    height: '2.6rem',
    fill: 'red',
    cursor: 'pointer'
  },
  commentForm: {
    margin: '2rem 0 4rem',
    display: 'flex',
    alignItems: 'flex-end',
    '& button': {
      marginTop: '1rem',
      marginLeft: '2rem'
    }
  },
  commentDate: {
    color: '#aaa',
    fontStyle: 'italic'
  }
})

const EventComments = ({ event, auth, deleteComment, addComment }) => {
  const classes = useStyles()
  const [toggleForm, setToggleForm] = useState(false)
  const [text, setText] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    addComment(event._id, { text })
    setText('')
    setToggleForm(false)
  }

  return (
    <div className={classes.comments}>
      <Typography variant='h3' color='secondary'>
        Commentaires:
      </Typography>

      <Button onClick={() => setToggleForm(true)} variant='contained' color='primary'>
        Ajouter un commentaire
      </Button>

      {toggleForm && (
        <form noValidate className={classes.commentForm} onSubmit={handleSubmit}>
          <TextField
            name='text'
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='Ton commentaire'
            fullWidth
          />
          <Button type='submit' variant='contained' color='primary'>
            Envoyer
          </Button>
        </form>
      )}

      {event.comments === null || event.comments.length === 0 ? (
        <Typography style={{ marginTop: '2rem' }} variant='body1'>
          Pas de commentaires pour le moment
        </Typography>
      ) : (
        event.comments.map(({ _id, name, avatar, text, date, user }) => (
          <div key={_id} className={classes.comment}>
            <div className={classes.commentUser}>
              <Avatar className={classes.commentUserAvatar} alt='' src={`http:${avatar}`} />
              <Typography variant='h5'>{name}</Typography>
            </div>
            <div>
              <Typography variant='body1'>{text}</Typography>
              <Typography variant='caption' className={classes.commentDate}>
                Créé le <span>{<Moment format='DD/MM/YYYY'>{date}</Moment>}</span>
              </Typography>
            </div>
            {!auth.loading && auth.isAuth && auth.user._id === user && (
              <HighlightOffIcon className={classes.commentIcon} onClick={() => deleteComment(event._id, _id)} />
            )}
          </div>
        ))
      )}
    </div>
  )
}

const mapState = state => ({
  auth: state.auth
})

EventComments.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
}

export default connect(mapState, { addComment, deleteComment })(EventComments)
