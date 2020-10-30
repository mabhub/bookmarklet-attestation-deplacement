import React from 'react';
import clsx from 'clsx';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
});

const Layout = ({ className, title = '', ...rest }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet
        htmlAttributes={{ lang: 'fr' }}
        title={title}
        titleTemplate="%s | Bookmarklet"
      />
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
