import React from 'react';
import clsx from 'clsx';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
import Link from './Link';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
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
  main: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
}));

const menu = [
  {
    children: 'Formulaire › Bookmarklet',
    to: '/',
  },
  {
    children: 'Bookmarklet › Bookmarklet',
    to: '/simple',
  },
  {
    children: 'Alternatives',
    to: '/alternatives',
  },
  {
    children: 'Github',
    to: 'https://github.com/mabhub/bookmarklet-attestation-deplacement',
  },
];

const Layout = ({ className, title = '', ...rest }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet
        htmlAttributes={{ lang: 'fr' }}
        title={title}
        titleTemplate="%s | Aide au remplissage de formulaire"
      />

      <Container>
        <Box className={classes.nav}>
          {menu.map(props => (
            <Box key={props.to} className={classes.navItem}>
              <Link activeClassName={classes.currentNavItem} {...props} />
            </Box>
          ))}
        </Box>
      </Container>

      <Container
        component="main"
        className={clsx(classes.main, className)}
        {...rest}
      />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
