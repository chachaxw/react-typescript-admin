import { Icon, Spin } from 'antd';

import React from 'react';
import styles from './Loading.module.scss';

export default function Loading() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    return (
        <div className={styles.loading}>
            <Spin size="large" indicator={antIcon} />
        </div>
    );
}
