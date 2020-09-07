import { makeStyles } from '@material-ui/core/styles'

export const eventStyles = makeStyles(theme => ({
  container: {
    padding: '3rem'
  },
  media: {
    maxHeight: '30rem',
    width: '100%',
    objectFit: 'cover',
    borderRadius: 10
  },
  eventContent: {
    marginTop: '3rem'
  },
  eventDetails: {
    margin: '2rem 0'
  },
  createdBy: {
    display: 'flex',
    alignItems: 'center',
    '& h5': {
      marginLeft: '1rem'
    }
  },
  eventActions: {
    margin: '2rem 0',
    '& button': {
      marginRight: '2rem'
    },
    '& a': {
      marginRight: '2rem'
    }
  },
  description: {
    marginTop: '3rem',
    '& h3': {
      marginBottom: '2rem'
    }
  },
  comments: {
    marginTop: '3rem',
    '& h3': {
      marginBottom: '2rem'
    }
  },
  comment: {
    margin: '2rem 0',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center'
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
  }
}))
