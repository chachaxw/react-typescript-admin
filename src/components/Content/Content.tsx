import { Layout } from 'antd';
import React from 'react';

interface InternalProps {
  children?: any;
}

export default function Content(props: InternalProps) {
  const styles = {
    padding: '0 40px',
  };

  return (
    <Layout.Content style={styles} >
      {props.children}
    </Layout.Content>
  );
}
