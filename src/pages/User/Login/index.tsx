import Footer from '@/components/Footer';
import {
  getCodeUsingPOST,
  getLoginUserUsingGET,
  loginByEmailUsingPOST,
  userLoginUsingPOST
} from '@/services/ytbi-backend/userController';
import {
  LockOutlined, MailTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  // useEffect(() => {
  //   listChartVOByPageUsingPOST({}).then(res => {
  //     console.error(res)
  //   })
  // })
  /**
   * 登录成功后获取用户信息
   */
  const fetchUserInfo = async () => {
    const res: API.BaseResponseUserVO_ = await getLoginUserUsingGET();
    const userInfo: API.UserVO | undefined = res.data;
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  /**
   * 获取验证码函数
   * @param values
   */
  const getFakeCaptcha = async (values: API.EmailLoginRequest) => {
    try {
      const res = await getCodeUsingPOST(values);
      if (res.code === 0) {
        return '0';
      } else {
        return undefined;
      }
    } catch (error) {
      const defaultLoginFailureMessage = '获取验证码失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
      return undefined;
    }
    return '0';
   }
  const handleSubmit = async (values: any) => {
    alert("??")
    try {
      // 登录
      if (type === 'account') {
        const res: API.BaseResponseLoginUserVO_ = await userLoginUsingPOST({
          ...values,
        });
        if (res.code === 0) {
          const defaultLoginSuccessMessage = '登录成功！';
          message.success(defaultLoginSuccessMessage);
          await fetchUserInfo();
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          return;
        } else {
          message.error(res.message);
        }
        console.log(res);
        // 如果失败去设置用户错误信息
        //setUserLoginState(msg);
      } else if (type === 'email') {
        const res: API.BaseResponseLoginUserVO_ = await loginByEmailUsingPOST({
          ...values,
        });
        if (res.code === 0) {
          const defaultLoginSuccessMessage = '登录成功！';
          message.success(defaultLoginSuccessMessage);
          await fetchUserInfo();
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          return;
        } else {
          message.error(res.message);
        }
        console.log(res);
        // 如果失败去设置用户错误信息
        //setUserLoginState(msg);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="YT smart BI"
          subTitle={'YT smart BI 是一个基于AI的智能数据分析平台'}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
              {
                key: 'email',
                label: '邮箱登录或注册',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'email' && <LoginMessage content="验证码错误" />}
          {type === 'email' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailTwoTone />,
                }}
                name="userAccount"
                placeholder={'请输入邮箱！'}
                rules={[
                  {
                    required: true,
                    message: '邮箱是必填项！',
                  },
                  {
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/,
                    message: '不合法的邮箱！',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                countDown={120}
                placeholder={'请输入验证码！'}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                phoneName="userAccount"
                name="code"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                onGetCaptcha={async (userAccount) => {
                  alert(userAccount)
                  const result = await getFakeCaptcha({
                    "userAccount": userAccount
                  });
                  if (!result) {
                    message.error('发送验证码失败！');
                    return;
                  }
                  message.success('发送验证码成功！请到邮箱查看');
                }}
              />
            </>
          )}
          {
            type !== 'email' ? <div
              style={{
                marginBottom: 24,
              }}
            >
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码 ?
              </a>
              <br />
            </div> : null
          }
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
