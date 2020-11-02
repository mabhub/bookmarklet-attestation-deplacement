import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import Layout from '../components/Layout';
import MDBlock from '../components/MDBlock';
import Link from '../components/Link';

import { noop } from '../helpers';
import SourceCode from '../components/SourceCode';

const generatedSource = `const fields = { "field-firstname": "John", "field-lastname": "Doe" };
const checkboxes = ["checkbox-achats"];

Object.entries(fields).forEach(
  ([field, value]) => document.querySelector('#' + field).value = value
);

checkboxes.forEach(
  checkbox => document.querySelector('#' + checkbox).checked = 'checked'
);`;

const bookmarkletSourceUrl = 'https://github.com/mabhub/bookmarklet-attestation-deplacement/blob/main/src/bookmarklet.js';

const useStyles = makeStyles(theme => ({
  box: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  breath: {
    marginTop: theme.spacing(4),
  },
  explanations: {
    '& .footnotes': {
      color: theme.palette.grey[500],
      '& > hr': {
        display: 'none',
      },
      '& ol > li > p': {
        display: 'inline',
      },
    },
  },
  sourceCode: {
    margin: 0,
    maxHeight: 320,
    overflow: 'auto',
  },
  sourceLink: {
    textAlign: 'right',
    fontStyle: 'italic',
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

      <MDBlock block="explications" className={classes.explanations} />

      <Typography variant="h2">
        Explications techniques
      </Typography>

      <Typography variant="subtitle2" paragraph>
        …qui n'intéressera probablement que les développeurs.
      </Typography>

      <Typography variant="h3" paragraph>
        Bookmarklet d'enregistrement
      </Typography>

      <Paper variant="outlined">
        <SourceCode content={source} className={classes.sourceCode} />
      </Paper>

      <Box className={classes.sourceLink}>
        <Typography variant="body2">
          Le <Link to={bookmarkletSourceUrl}>code source du bookmarklet principal</Link> est
          accessible <Link to={bookmarkletSourceUrl}>directement sur Github.</Link>
        </Typography>
      </Box>

      <Typography variant="h3" paragraph className={classes.breath}>
        Bookmarklet (généré) de saisie
      </Typography>

      <Paper variant="outlined">
        <SourceCode content={generatedSource} className={classes.sourceCode} />
      </Paper>
    </Layout>
  );
};

export default Simple;
