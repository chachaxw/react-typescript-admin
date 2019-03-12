import { Avatar, Empty, List, Skeleton } from 'antd';
import { format } from 'date-fns';
import { Link } from 'dva/router';
import React, { PureComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '../Loading/Loading';

import styles from './Header.module.scss';

interface InternalProps {
  notices: any[];
  loading: boolean;
  hasMore: boolean;
  loadMoreNotices: (params: any) => void;
  closeNoticePane: (visible: boolean) => void;
}

interface InternalState {
  page: number;
}

class NoticePane extends PureComponent<InternalProps, InternalState> {

  constructor(props: InternalProps) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  public renderItem(props: any) {
    return (
      <List.Item key={props.id}>
        <Skeleton avatar title={false} loading={false}>
          <List.Item.Meta
            avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" />}
            title={
              <div>
                订单<Link to={`/app/order/detail/${props.id}`}>{props.orderNumber}</Link> 预约配送
              </div>
            }
            description={format(props.createdTime, 'YYYY-MM-DD HH:mm:ss')}
          />
        </Skeleton>
      </List.Item>
    );
  }

  public loadMore() {
    const { hasMore, loadMoreNotices } = this.props;

    if (!hasMore) {
      return;
    }

    const page = this.state.page + 1;
    loadMoreNotices({ page });
  }

  public render() {
    const { notices, closeNoticePane, loading, hasMore } = this.props;

    return (
      <div className={styles.noticePane}>
        <div className={styles.noticeTop}>消息中心</div>
        <div className={styles.noticePaneList}>
          <InfiniteScroll
            pageStart={0}
            useWindow={false}
            initialLoad={false}
            loader={<Loading key="loading" />}
            loadMore={() => this.loadMore()}
            hasMore={!loading && hasMore}
          >
            {notices && notices.length ?
              <List key="notices" dataSource={notices} renderItem={(item: any) => this.renderItem(item)}>
                {hasMore ?
                  <div className={styles.loadMore}>加载更多</div> :
                  <div className={styles.noMore}>没有更多通知！</div>
                }
              </List> : <Empty description="暂时没有消息！" />
            }
          </InfiniteScroll>
        </div>
        <div className={styles.noticeBottom} onClick={() => closeNoticePane(false)}>
          关闭窗口
        </div>
      </div>
    );
  }
}

export default NoticePane;
