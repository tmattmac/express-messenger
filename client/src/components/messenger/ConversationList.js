import { Avatar, IconButton, List, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import ConversationListItem from './ConversationListItem';
import getContext from '../../contexts/getContext';
import UserSearch from './UserSearch';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '2em',
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  conversationList: {
    flexGrow: 2,
    overflowY: 'auto'
  },
  header: {
    fontWeight: 'bold',
    marginBottom: '1em'
  },
  userCard: {
    marginBottom: '3em',
    display: 'flex',
    alignItems: 'baseline',
    '&>span': {
      fontWeight: 'bold',
      marginLeft: '1em',
      display: 'block',
      flexGrow: 2
    }
  },
  userMenuToggle: {
    color: '#95A7C4'
  }
}))

const ConversationList = () => {

  const classes = useStyles();

  const { user, logout } = useContext(getContext('user'));
  const { conversations } = useContext(getContext('conversations'));
  const [anchor, setAnchor] = useState(null);

  const lastUpdated = (conversation) => {
    return conversation.messages[conversation.messages.length - 1].timestamp;
  }

  const sortedConversationIds = Object.keys(conversations)
    .sort((a, b) => +lastUpdated(conversations[b]) - +lastUpdated(conversations[a]));
  
  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  }

  const handleClose = () => {
    setAnchor(null);
  }

  return (
    <div className={classes.root}>
      <div className={classes.userCard}>
        <Avatar>{user.toUpperCase()[0]}</Avatar>
        <Typography variant="h6" component="span">{user}</Typography>
        <IconButton size="small" className={classes.userMenuToggle} onClick={handleClick}>
          <span>
            &bull;&bull;&bull;
          </span>
        </IconButton>
        <Menu
          anchorEl={anchor}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(anchor)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <MenuItem onClick={logout}>Log Out</MenuItem>
        </Menu>
      </div>
      <Typography variant="h5" component="h2" className={classes.header}>Chats</Typography>
      <UserSearch />
      <List className={classes.conversationList}>
        {sortedConversationIds.map(id => (
          <ConversationListItem key={id} id={id} />
        ))}
      </List>
    </div>
  );
}
 
export default ConversationList;