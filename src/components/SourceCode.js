import React from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  code: {
    overflowX: 'scroll',
    paddingBottom: '0.5rem',
  },
});

const SourceCode = ({ content }) => {
  const classes = useStyles();

  return (
    <pre className={classes.code}>
      {content}
    </pre>
  );
};

export default SourceCode;
