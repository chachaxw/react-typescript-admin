import * as React from 'react';

import styles from './SideBar.module.scss';

export default function Logo(props: any) {
  return (
    <div className={styles.logo} {...props}>
      <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="React-Typescript-Admin"/>
    </div>
  );
}
