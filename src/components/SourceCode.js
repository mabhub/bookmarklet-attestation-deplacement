import React from 'react';
import Highlight from 'react-highlight.js';

import 'highlight.js/styles/monokai.css';

const SourceCode = ({ content }) => (
  <Highlight language="javascript">
    {content}
  </Highlight>
);

export default SourceCode;
