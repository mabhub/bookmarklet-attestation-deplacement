import React from 'react';

import Rehype2react from 'rehype-react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const MarkdownText = ({ hast, components, ...rest }) => {
  const renderAst = new Rehype2react({
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: {
      h1: props => <Typography variant="h1" paragraph {...props} />,
      h2: props => <Typography variant="h2" paragraph {...props} />,
      h3: props => <Typography variant="h3" paragraph {...props} />,
      h4: props => <Typography variant="h4" paragraph {...props} />,
      h5: props => <Typography variant="h5" paragraph {...props} />,
      h6: props => <Typography variant="h6" paragraph {...props} />,
      p: props => <Typography variant="body1" paragraph {...props} />,
      ...components,
    },
  }).Compiler;

  return (
    <Box {...rest}>{renderAst(hast)}</Box>
  );
};

export default MarkdownText;
