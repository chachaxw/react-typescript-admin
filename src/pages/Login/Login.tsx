import { Button, Form, Icon, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { EmailRxp } from '../../utils/constant';
import styles from './Login.module.scss';

interface FormProps extends FormComponentProps {
  email: string;
  password: string;
}

interface DvaProps {
  loading: boolean;
  login: (params: any) => void;
}

interface InternalProps extends DvaProps {
  form: any;
}

export class Login extends PureComponent<InternalProps> {

  public onSubmit = () => {
    const { login, form } = this.props;
    const { validateFields } = form;

    validateFields((err: any, values: any) => {
      if (!err) {
        login(values);
      }
    });
  }

  public render() {
    const color = 'rgba(0,0,0,.25)';
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.login}>
        <svg className="Header__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1337.97 684.43">
          <path
            className="Header__shape bigSquare" fill="#16d5d1"
            d="M546.519 349.271l86.383-56.098 56.097 86.383-86.383 56.098z"
          />
          <path
            className="Header__shape triangle"
            fill="none" stroke="#ff4676" strokeWidth="8"
            d="M372.15 462.17L321 434.58l-4.88 56.16z"
          />
          <circle
            className="Header__shape bigCircle"
            fill="#ff4676" cx="1076.52" cy="262.17" r="59"
          />
          <path
            className="Header__shape littleSquare" fill="#ffe430"
            d="M285.523 262.61l12.372-53.59 53.59 12.372-12.372 53.59z"
          />
          <circle
            className="Header__shape hoop" fill="none" stroke="#ffe430"
            strokeWidth="13" cx="905.52" cy="447.17" r="45"
          />
          <circle
            className="Header__shape littleCircle"
            fill="#0f1c70" cx="1036.52" cy="203.17" r="27"
          />
        </svg>
        <Form style={{ width: 320 }} onSubmit={this.onSubmit}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input email！' },
                { pattern: EmailRxp, message: 'Please input right email!' },
              ],
            })(
              <Input
                prefix={<Icon type="inbox" style={{ color }} />}
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input password!' },
              ],
            })(
              <Input
                type="password"
                prefix={<Icon type="key" style={{ color }} />}
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const CreateLogin = Form.create<FormProps>()(Login);

const mapStateToProps = ({ global, loading }: any) => {
  return {
    loading: loading.effects['global/login'],
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    login: (params: object) => {
      dispatch({
        type: 'global/login',
        payload: params,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLogin);
