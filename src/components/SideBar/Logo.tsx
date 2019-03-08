import * as React from 'react';

import styles from './SideBar.module.scss';

export default function Logo(props: any) {
    return (
        <div className={styles.logo}>
            <img src={`${process.env.PUBLIC_URL}/images/candela.png`} alt="Candela"/>
            {!props.collapsed && <img src={`${process.env.PUBLIC_URL}/images/candela.svg`} alt="Candela"/>}
        </div>
    );
}
