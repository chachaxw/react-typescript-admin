import { Layout } from 'antd';
import { getYear } from 'date-fns';
import React, { FunctionComponent } from 'react';

const Footer: FunctionComponent<any> = (props) => {
  return (
    <Layout.Footer style={{ textAlign: 'center', backgroundColor: '#fff' }} {...props}>
      Copyright ©{getYear(new Date())} Created by Chacha
    </Layout.Footer>
  );
};

export default Footer;
