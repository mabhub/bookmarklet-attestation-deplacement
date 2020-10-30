import React from 'react';
import useBlocks from '../hooks/useBlocks';
import MarkdownText from './MarkdownText';

const MDBlock = ({ block, ...props }) => {
  const { [block]: selectedBlock } = useBlocks();

  if (!selectedBlock) {
    return (
      <div {...props}>
        <span>No such block: <tt>src/md-blocks/{block}</tt></span>
      </div>
    );
  }

  return (
    <MarkdownText hast={selectedBlock.htmlAst} />
  );
};

export default MDBlock;
