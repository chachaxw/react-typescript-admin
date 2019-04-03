import { Button } from 'antd';
import { Link } from 'dva/router';
import React, { PureComponent } from 'react';
import DocumentTitle from 'react-document-title';

interface InternalState {
  animated: string;
}

export default class NotFound extends PureComponent<any, InternalState> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    const styles = {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ececec',
      overflow: 'hidden',
    };

    return (
      <DocumentTitle title="页面未找到">
        <div style={styles}>
          <img src={`${process.env.PUBLIC_URL}/images/exception_404.svg`} alt="404" />
          <div style={{marginLeft: 30}}>
            <p style={{fontSize: 72, fontWeight: 'bold', marginBottom: 0}}>404</p>
            <p style={{fontSize: 24, marginTop: 16}}>抱歉，你访问的页面不存在</p>
            <Link to="/app/dashboard">
              <Button type="primary">返回首页</Button>
            </Link>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
