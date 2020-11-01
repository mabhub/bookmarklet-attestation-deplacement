import React from 'react';
import clsx from 'clsx';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import favicon from '../favicon.svg';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const Layout = ({
  className,
  title = '',
  noHeader,
  noFooter,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet
        htmlAttributes={{ lang: 'fr' }}
        title={title}
        titleTemplate="%s | Aide au remplissage de formulaire"
        link={[
          { rel: 'shortcut icon', type: 'image/svg', href: `${favicon}` },
        ]}
      />

      {!noHeader && <Header />}

      <Container
        component="main"
        className={clsx(classes.main, className)}
        {...rest}
      />

      {!noFooter && <Footer />}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
