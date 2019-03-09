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
          <img src={`${process.env.PUBLIC_URL}/images/404.png`} alt="404" />
        </div>
      </DocumentTitle>
    );
  }
}
