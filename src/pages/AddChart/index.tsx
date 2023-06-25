import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Select,
  Input,
  Space,
  Card,
  Upload, message, Row, Col,
} from 'antd';
import React, {useState} from 'react';
import {PageContainer} from "@ant-design/pro-components";
import {genChartByAiUsingPOST} from "@/services/ytbi-backend/chartController";
import ReactECharts from 'echarts-for-react';
/**
 * 添加图表
 * @constructor
 */
const AddChart: React.FC = () => {

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const [chartInfo, setChartInfo] = useState<API.BiResponse>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [chartOption, setChartOption] = useState<any>();

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitLoading) {
      return;
    }
    console.log('Received values of form: ', values.file[0]);
    // 对接后端
    const params = {
      ...values,
      file: undefined
    }
    try {
      setSubmitLoading(true)
      const res: API.BaseResponseBiResponse_ = await genChartByAiUsingPOST(params, {}, values.file[0].originFileObj)
      console.log(res);
      if (res.code === 0) {
        if (res.data) {
          alert(1)
          const tmpOption = JSON.parse(res.data.genOption ?? "");
          // if (tmpOption) {
          //   throw new Error("图表代码解析错误");
          // }
          alert(2)
          message.success("分析成功");
          // 数据展示
          setChartOption(tmpOption);
          setChartInfo(res.data);
          alert(3)
          console.log(chartOption)
        } else {
          message.error(res.message);
        }
      } else {
        message.error(res.message);
      }
    }  finally {
      setSubmitLoading(false);
    }

  };

  return (
    <PageContainer>
      <Row gutter={24}>
        <Col span={12}>
          <Card title={"智能分析"}>
            <div className={"add-chart"}>
              <Form
                name="addChart"
                {...formItemLayout}
                labelAlign={"left"}
                onFinish={onFinish}
                initialValues={{  }}
                style={{ maxWidth: 600 }}
              >
                <Form.Item
                  {...formItemLayout}
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please input your chart name' }]}
                >
                  <Input placeholder="Please input your name" />
                </Form.Item>
                <Form.Item
                  name="chartType"
                  label="图表类型"
                  hasFeedback
                  rules={[{ required: true, message: '请选择图表类型!' }]}
                >
                  <Select
                    placeholder="请选择图表样式"
                    options={[
                      {value: "折线图", label: '折线图'},
                      {value: "饼图", label: '饼图'},
                      {value: "柱状图", label: '柱状图'},
                      {value: "堆叠图", label: '堆叠图'},
                      {value: "雷达图", label: '雷达图'},
                      {value: "热力图", label: '热力图'}
                    ]}
                  />
                </Form.Item>


                <Form.Item
                  name="goal"
                  label="输入你的需求"
                  rules={[{ required: true, message: '需求不能为空!' }]}
                >
                  <Input.TextArea showCount maxLength={100} />
                </Form.Item>

                <Form.Item
                  name="file"
                  label="上传待分析文件"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="请上传excel格式的文件数据"
                >
                  <Upload name="logo" action="/upload.do" listType="picture" maxCount={1}>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>


                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={submitLoading} disabled={ submitLoading}>
                      分析数据
                    </Button>
                    <Button htmlType="reset">reset</Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={"分析结论"}>
            <div>{chartInfo?.genResult ?? <div>请上传图表等信息得到分析结论</div>}</div>
          </Card>
          <br/>
          <Card title={"可视化图表"}>
            <div>
              {
                chartOption && <ReactECharts option={chartOption} />
              }
            </div>
          </Card>
        </Col>
      </Row>




    </PageContainer>

  );
};
export default AddChart;
