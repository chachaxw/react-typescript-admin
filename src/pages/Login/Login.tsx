import React, { PureComponent } from 'react';
import styles from './Login.module.scss';

export default class Login extends PureComponent {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className={styles.login}>
                Login
            </div>
        );
    }
}
