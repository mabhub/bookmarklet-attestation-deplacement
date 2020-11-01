import React from 'react';

import { Container, makeStyles, Typography } from '@material-ui/core';

import Link from './Link';

const github = 'https://github.com/mabhub/bookmarklet-attestation-deplacement';
const netlify = 'https://fr.wikipedia.org/wiki/Netlify';

const useStyles = makeStyles(theme => ({
  footer: {
    textAlign: 'center',
    padding: theme.spacing(2, 0),
    color: theme.palette.grey[500],
  },
}));
const Header = () => {
  const classes = useStyles();

  return (
    <Container component="footer" className={classes.footer}>
      <Typography variant="body1">
        L'ensemble des sources de ce site sont disponibles{' '}
        <Link color="inherit" to={github}>sur Github</Link>.

        Cette instance est hébergée sur{' '}
        <Link color="inherit" to={netlify}>Netlify</Link>.
      </Typography>

      <Typography variant="body2">
        Ce site ne transfert aucune information, et n'en stocke
        aucune sur votre navigateur web (ni cookie ni localStorage).
      </Typography>
    </Container>
  );
};

export default Header;
