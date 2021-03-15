import NProgress from 'nprogress';
import React, { FC, useEffect } from 'react';
import { Motion, spring } from 'react-motion';

import styles from './Loading.module.scss';

NProgress.configure({ showSpinner: false });

export const Loading: FC<any> = (props) => {
  const { children } = props;

  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Motion style={{ isReady: spring(children ? 1 : 0) }}>
      {({ isReady }: any) => {
        if (isReady === 1) {
          NProgress.done();
        }

        return (
          <div className={styles.loading} style={{ backgroundColor: `rgba(255, 255, 255, ${1 - isReady})` }}>
            {children && <div style={{ opacity: isReady, width: '100%' }}>{children}</div>}
          </div>
        );
      }}
    </Motion>
  );
};

export default Loading;
