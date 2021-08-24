import React from 'react';
import { connect } from 'react-redux';
import AdderItem from './AdderItem/item';
import styles from './styles.module.css';
interface Props {
  className?: string;
  position: number;
  showing: boolean;
  blocks: AdderItem[];
}

const Adder = ({ showing, blocks }: Props) => {
  return showing ? (
    <div className={styles.container}>
      Blocks
      {blocks.map((b, index) => (
        <AdderItem key={index} {...b} />
      ))}
    </div>
  ) : (
    <></>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  blocks: state.adder.blocks,
});

export default connect(mapStateToProps)(Adder);
