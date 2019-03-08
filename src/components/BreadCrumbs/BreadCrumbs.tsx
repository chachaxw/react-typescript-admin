import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import React, { PureComponent } from 'react';

interface InternalProps {
    first?: string;
    second?: string;
}

class BreadCrumbs extends PureComponent<InternalProps> {

    public render() {
        const { first, second } = this.props;

        return (
            <span>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>
                        <Link to={'/app/dashboard'}>首页</Link>
                    </Breadcrumb.Item>
                        {first && <Breadcrumb.Item>{first}</Breadcrumb.Item>}
                        {second && <Breadcrumb.Item>{second}</Breadcrumb.Item>}
                </Breadcrumb>
            </span>
        );
    }
}

export default BreadCrumbs;
