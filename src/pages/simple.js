import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import Layout from '../components/Layout';
import MDBlock from '../components/MDBlock';

import { noop } from '../helpers';
import SourceCode from '../components/SourceCode';

const useStyles = makeStyles(theme => ({
  box: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  breath: {
    marginTop: theme.spacing(4),
  },
}));

const Simple = () => {
  const classes = useStyles();

  const { file: { internal: { source }, fields: { miniSource } } } = useStaticQuery(graphql`
    {
      file(sourceInstanceName: {eq: "bookmarklet"}) {
        internal {
          source: content
        }
        fields {
          miniSource
        }
      }
    }

  `);

  const setHref = React.useCallback(node => {
    // eslint-disable-next-line no-param-reassign
    if (node) { node.href = miniSource; }
  }, [miniSource]);

  return (
    <Layout title="Bookmarklet › Bookmarklet">
      <MDBlock block="simple" />

      <Box className={classes.box}>
        <Button
          href="#"
          variant="outlined"
          color="secondary"
          onClick={noop}
          ref={setHref}
        >
          Enregistrer la saisie
        </Button>
      </Box>

      <Typography variant="h3">
        Explications techniques
      </Typography>

      <Typography variant="subtitle2" paragraph>
        …qui n'intéressera probablement que les développeurs.
      </Typography>

      <Typography variant="body1" paragraph>
        Voici la source du bookmarklet :
      </Typography>

      <Paper variant="outlined">
        <SourceCode content={source} />
      </Paper>

      <Typography variant="body1" paragraph className={classes.breath}>
        Ce qui, une fois transformé en bookmarklet done :
      </Typography>

      <Paper variant="outlined">
        <SourceCode content={miniSource} />
      </Paper>
    </Layout>
  );
};

export default Simple;
