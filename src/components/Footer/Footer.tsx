import { Icon, Layout } from 'antd';
import React from 'react';

export default function Footer(props: any) {
  return (
    <Layout.Footer {...props}>
      Copyright ©2019 Created by Chacha
      <a rel="noopener noreferrer" href="https://github.com/chachaxw/react-typescript-admin"
        target="_blank" style={{margin: '0 10px'}}>
        <Icon type="github" />
      </a>
    </Layout.Footer>
  );
}
