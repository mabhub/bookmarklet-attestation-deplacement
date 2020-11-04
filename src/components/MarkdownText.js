import React from 'react';
import { Link as GLink } from 'gatsby';
import Rehype2react from 'rehype-react';

import { Divider, Box, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  hr: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const MarkdownText = ({ hast, components, ...rest }) => {
  const classes = useStyles();

  const renderAst = new Rehype2react({
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      h1: props => <Typography variant="h1" gutterBottom {...props} />,
      h2: props => <Typography variant="h2" gutterBottom {...props} />,
      h3: props => <Typography variant="h3" gutterBottom {...props} />,
      h4: props => <Typography variant="h4" gutterBottom {...props} />,
      h5: props => <Typography variant="h5" gutterBottom {...props} />,
      h6: props => <Typography variant="h6" gutterBottom {...props} />,
      p: props => <Typography variant="body1" gutterBottom {...props} />,
      hr: props => <Divider className={classes.hr} {...props} />,
      a: ({ href, ...props }) => {
        if (href[0] === '/') {
          return <Link component={GLink} to={href} {...props} />;
        }
        return <Link href={href} {...props} />;
      },
      ...components,
    },
  }).Compiler;

  return (
    <Box {...rest}>{renderAst(hast)}</Box>
  );
};

export default MarkdownText;
