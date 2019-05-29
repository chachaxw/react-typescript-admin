import { Layout } from 'antd';
import React from 'react';

interface InternalProps {
  children?: any;
}

export default function Content(props: InternalProps) {
  return (
    <Layout.Content>{props.children}</Layout.Content>
  );
}
