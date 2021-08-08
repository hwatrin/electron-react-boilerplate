import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { addOrEditBlockRedux, deleteBlockRedux } from '../../../redux/blocks';
import { deleteBlockReferenceRedux } from '../../../redux/pages';
import styles from './styles.module.css';

interface Props {
  pageInteractors: PageInteractors;
  block: PlainText;
  pageData: PageData;
  blocks: Block[];
  deleteBlockReference: (arg: { payload: number; page_id: string }) => any;
  deleteBlock: ({ payload }: { payload: Block }) => any;
  editBlock: ({ payload }: { payload: Block }) => any;
}

const Line = ({
  block,
  pageInteractors,
  pageData,
  deleteBlock,
  editBlock,
  deleteBlockReference,
}: Props) => {
  const { selectLine, addLine, forceUpdate } = pageInteractors;
  const { selectedLine, index } = pageData;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const editText = (str: string) => {
    const newBlock: Block = { ...block, text: str };
    editBlock({ payload: newBlock });
    forceUpdate();
  };

  useEffect(() => {
    if (selectedLine.pos === index) {
      if (inputRef.current) {
        inputRef.current.focus();
        if (selectedLine.move) inputRef.current.selectionEnd = 0;
      }
    }
  }, [selectedLine]);

  return (
    <input
      ref={inputRef}
      onFocus={() => selectLine(index)}
      className={styles.line}
      onKeyDown={(e) => {
        let newLineText = '';
        if (e.key === 'Enter') {
          if (
            inputRef.current &&
            (inputRef.current.selectionEnd ||
              inputRef.current?.selectionEnd === 0)
          ) {
            const cursorLoc = inputRef.current.selectionEnd;
            if (cursorLoc < block.text.length) {
              newLineText = block.text.substring(cursorLoc, block.text.length);
              editText(block.text.substring(0, cursorLoc));
            }
          }
          addLine(index + 1, newLineText);
        }
        if (e.key === 'ArrowUp') selectLine(index - 1);
        if (e.key === 'ArrowDown') selectLine(index + 1);
        if (e.key === 'Backspace' && block.text.length === 0 && index !== 0) {
          deleteBlockReference({
            payload: pageData.index,
            page_id: pageData._id,
          });
          deleteBlock({ payload: block });
          selectLine(index - 1);
        }
      }}
      onChange={(e) => editText(e.target.value)}
      value={block.text}
    />
  );
};

const mapStateToProps = (state: ReduxState) => ({
  blocks: state.blocks,
});
const mapDispatchToProps = {
  editBlock: addOrEditBlockRedux,
  deleteBlock: deleteBlockRedux,
  deleteBlockReference: deleteBlockReferenceRedux,
};

export default connect(mapStateToProps, mapDispatchToProps)(Line);
