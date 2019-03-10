import { Card, Col, Icon, Row, Skeleton, Statistic } from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';

import { BreadCrumbs } from '../../components';
import styles from './Dashboard.module.scss';

const Countdown = Statistic.Countdown;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

interface DvaProps {
  summary?: any;
  loading: boolean;
}

class Dashboard extends Component<DvaProps> {

  constructor(props: DvaProps) {
    super(props);
  }

  public render() {
    const { loading, summary } = this.props;

    return (
      <div className={styles.dashboard}>
        <BreadCrumbs />
        <Row gutter={16}>
          <Col md={4}>
            <Skeleton title={false} active loading={loading}>
              <Card bordered={false}>
                <Statistic
                  title="活跃"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<Icon type="arrow-up" />}
                  suffix="%"
                />
              </Card>
            </Skeleton>
          </Col>
          <Col md={4}>
            <Skeleton title={false} active loading={loading}>
              <Card bordered={false}>
                <Statistic
                  title="空闲"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<Icon type="arrow-down" />}
                  suffix="%"
                />
              </Card>
            </Skeleton>
          </Col>
          <Col md={8}>
            <Skeleton title={false} active loading={loading}>
              <Card bordered={false}>
                <Countdown title="倒计时" value={deadline} format="D 天 H 时 m 分 s 秒" />
              </Card>
            </Skeleton>
          </Col>
          <Col md={6}>
            <Skeleton title={false} active loading={loading}>
              <Card bordered={false}>
                <Statistic
                  title="反馈"
                  value={1128}
                  prefix={<Icon type="like" />}
                />
              </Card>
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
