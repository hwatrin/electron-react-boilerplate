import React from 'react';
import Line from '../Line';

interface Props {
  block: Block;
  pageInteractors: PageInteractors;
  pageData: PageData;
}

const Block = ({ block, pageInteractors, pageData }: Props) => {
  switch (block.discriminator) {
    case 'PlainText':
      return (
        <Line
          block={block}
          pageInteractors={pageInteractors}
          pageData={pageData}
        />
      );
    default:
      return <></>;
  }
};

export default Block;
