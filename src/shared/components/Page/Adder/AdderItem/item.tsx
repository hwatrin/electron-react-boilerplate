import React from 'react';
import styles from './styles.module.css';

const AdderItem = ({ title, description }: AdderItem) => {
  return (
    <div
      className={styles.container}
      onClick={() => {
        alert(title);
      }}
    >
      <h6>{title}</h6>
      <p>{description}</p>
    </div>
  );
};

export default AdderItem;
