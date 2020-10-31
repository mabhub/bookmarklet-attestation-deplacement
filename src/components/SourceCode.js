import React from 'react';
import Highlight from 'react-highlight.js';

import 'highlight.js/styles/atom-one-light.css';

const SourceCode = ({ content }) => (
  <Highlight language="javascript">
    {content}
  </Highlight>
);

export default SourceCode;
