import React from 'react';

import { Container, Box, makeStyles } from '@material-ui/core';

import Link from './Link';

const useStyles = makeStyles(theme => ({
  nav: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0),
  },
  navItem: {
    margin: theme.spacing(0, 2),
  },
  currentNavItem: {
    color: theme.palette.secondary.main,
  },
}));

const menu = [
  { children: 'Formulaire › Bookmarklet', to: '/' },
  { children: 'Bookmarklet › Bookmarklet', to: '/simple' },
  { children: 'Alternatives', to: '/alternatives' },
  { children: 'Github', to: 'https://github.com/mabhub/bookmarklet-attestation-deplacement' },
];

const Header = () => {
  const classes = useStyles();

  return (
    <Container component="header">
      <Box className={classes.nav}>
        {menu.map(props => (
          <Box key={props.to} className={classes.navItem}>
            <Link activeClassName={classes.currentNavItem} {...props} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Header;
