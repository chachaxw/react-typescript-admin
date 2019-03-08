import { Col, Row, Skeleton } from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';

import { BreadCrumbs } from '../../components';
import { formatSeconds } from '../../utils/utils';
import styles from './Dashboard.module.scss';

interface DvaProps {
    total?: any;
    today?: any;
    loading: boolean;
}

class Dashboard extends Component<DvaProps> {

    constructor(props: DvaProps) {
        super(props);
    }

    public render() {
        const { loading, total, today } = this.props;

        return (
            <div className={styles.dashboard}>
                <BreadCrumbs />
                <Row>
                    <Col md={4}>
                        <Skeleton title={false} active loading={loading}>
                            <div className="text-muted">累计订单</div>
                            <h2>{total && total.count && total.count.total || 0}</h2>
                        </Skeleton>
                    </Col>
                    <Col md={4}>
                        <Skeleton title={false} active loading={loading}>
                            <div className="text-muted">累计车配送订单</div>
                            <h2>{total && total.count && total.count.robot || 0}</h2>
                        </Skeleton>
                    </Col>
                    <Col md={4}>
                        <Skeleton title={false} active loading={loading}>
                            <div className="text-muted">订单配送平均用时</div>
                            <h2>
                                {total && total.timing ? formatSeconds(total.timing.transit / 1000) : 0}
                            </h2>
                        </Skeleton>
                    </Col>
                    <Col md={4}>
                        <Skeleton title={false} active loading={loading}>
                            <div className="text-muted">今日订单量</div>
                            <h2>{today && today.count && today.count.total || 0}</h2>
                        </Skeleton>
                    </Col>
                    <Col md={4}>
                        <Skeleton title={false} active loading={loading}>
                            <div className="text-muted">今日车配送订单</div>
                            <h2>{today && today.count && today.count.robot || 0}</h2>
                        </Skeleton>
                    </Col>
                    <Col md={4}>
                        <Skeleton title={false} active loading={loading}>
                            <div className="text-muted">今日订单配送平均用时</div>
                            <h2>
                                {today && today.timing && today.timing.transit ?
                                    formatSeconds(today.timing.transit / 1000) : 0
                                }
                            </h2>
                        </Skeleton>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        total: state.dashboard.total,
        today: state.dashboard.today,
        loading: state.dashboard.loading,
    };
};

export default connect(mapStateToProps)(Dashboard);
