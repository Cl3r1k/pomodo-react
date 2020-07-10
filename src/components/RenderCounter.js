import React from 'react';

import styles from 'styles/RenderCounter.module.scss';

export const RenderCounter = () => {
  return (
    <div className={styles.renderCounterContainer}>
      <p className={styles.renderCounterInfo}>
        Some render info: <strong>0</strong>
      </p>
    </div>
  );
};
