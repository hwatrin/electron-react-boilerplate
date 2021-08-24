import React from 'react';
import Adder from '../Adder';
import Line from '../Line';

interface Props {
  block: Block;
  pageInteractors: PageInteractors;
  pageData: PageData;
}

const Block = ({ block, pageInteractors, pageData }: Props) => {
  let item = <></>;
  switch (block.discriminator) {
    case 'PlainText':
      item = (
        <Line
          block={block}
          pageInteractors={pageInteractors}
          pageData={pageData}
        />
      );
      break;
    default:
      return <></>;
  }

  return (
    <div>
      {item}
      <Adder
        position={10}
        showing={
          pageData.index === pageData.selectedLine.pos && pageData.adderShowing
        }
      />
    </div>
  );
};

export default Block;
