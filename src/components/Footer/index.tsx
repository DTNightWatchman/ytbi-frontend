import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = 'YT摆渡人';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'YT smart BI',
          title: 'gitee地址',
          href: 'https://gitee.com/YTbaiduren',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/DTNightWatchman',
          blankTarget: true,
        },
        {
          key: 'YT smart BI',
          title: 'YT smart BI',
          href: 'https://github.com/DTNightWatchman/yt-bi-project',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
