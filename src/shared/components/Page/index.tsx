import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addOrEditBlockRedux } from '../../redux/blocks';
import {
  blankPage,
  addBlockReferenceRedux,
  BlockReferenceParams,
} from '../../redux/pages';
import Adder from './Adder';
import Block from './Block';
import styles from './styles.module.css';

//create your forceUpdate hook
const useForceUpdate = () => {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};

interface Props {
  page_id: string;
  pages: any;
  blocks: any;
  addBlock: ({ payload }: { payload: Block }) => any;
  addBlockReference: ({ index, page_id, payload }: BlockReferenceParams) => any;
}

const Page = ({
  page_id,
  pages,
  blocks,
  addBlock,
  addBlockReference,
}: Props) => {
  const page: Page = pages[page_id];
  const forceUpdate = useForceUpdate();

  const [selectedLine, setSelectedLine] = useState<{
    pos: number;
    move: boolean;
  }>({ pos: 0, move: false });
  const [adderShowing, setAdderShowing] = useState<boolean>(false);

  /**
   * Called when any input hits Enter key. This will add a new line and
   * move the cursor to it.
   * @param index number
   */
  const addLine = (index: number, text = '') => {
    const { block } = blankPage(page._id);
    if (block.discriminator === 'PlainText') {
      block.text = text;
    }

    addBlock({ payload: block });
    addBlockReference({ payload: block._id, page_id: page._id, index });

    selectLine(selectedLine.pos + 1, true);
  };

  /**
   * Checks if parameter "line" is between zero and the length of page.blocks. If so,
   * sets the selected line state to this line. Else, does nothing.
   * @param line number
   */
  const selectLine = (pos: number, move = false) => {
    if (pos >= 0 && pos < page.blocks.length) {azsd db89;n'   m0
      setSelectedLine({ pos, move });
    }
  };

  return (
    <div className={styles.lines}>
      {page.blocks.map((b: string, index: number) => {
        const block: Block = blocks[b];
        return (
          <Block
            pageInteractors={{
              addLine,
              selectLine,
              forceUpdate,
              setAdderShowing,
            }}
            pageData={{ selectedLine, index, _id: page._id, adderShowing }}
            key={index}
            block={block}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  pages: state.pages,
  blocks: state.blocks,
});

const mapDispatchToProps = {
  addBlockReference: addBlockReferenceRedux,
  addBlock: addOrEditBlockRedux,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
