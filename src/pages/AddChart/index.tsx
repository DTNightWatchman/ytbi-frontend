import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Select,
  Input,
  Space,
  Card,
  Upload,
} from 'antd';
import React from 'react';
import {PageContainer} from "@ant-design/pro-components";


const Login: React.FC = () => {
  const { Option } = Select;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <PageContainer>
      <Card>
        <div className={"add-chart"}>
          <Form
            name="addChart"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{  }}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              {...formItemLayout}
              name="username"
              label="Name"
              rules={[{ required: true, message: 'Please input your name' }]}
            >
              <Input placeholder="Please input your name" />
            </Form.Item>
            <Form.Item
              name="select"
              label="Select"
              hasFeedback
              rules={[{ required: true, message: 'Please select your country!' }]}
            >
              <Select placeholder="Please select a country">
                <Option value="饼图">饼图</Option>
                <Option value="线型图">线型图</Option>
                <Option value="热力图">热力图</Option>
              </Select>
            </Form.Item>


            <Form.Item name="rate" label="输入你的需求">
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
              name="upload"
              label="上传待分析文件"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              extra="请上传excel格式的文件数据"
            >
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>


            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="reset">reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Card>

    </PageContainer>

  );
};
export default Login;
