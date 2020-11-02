import React from 'react';
import Highlight from 'react-highlight.js';

import 'highlight.js/styles/atom-one-light.css';

const SourceCode = ({ content, ...props }) => (
  <Highlight language="javascript" {...props}>
    {content}
  </Highlight>
);

export default SourceCode;
