import {listChartVOByPageAllUsingPOST, listChartVOByPageUsingPOST} from '@/services/ytbi-backend/chartController';
import { PageContainer } from '@ant-design/pro-components';
import '@umijs/max';
import { Card, List, message, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

const { Title } = Typography;
const AllUserHistory: React.FC = () => {
  const initSearchParams: API.ChartQueryRequest = {
    current: 1,
    pageSize: 12,
  };
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const [chartList, setChartList] = useState<API.ChartVO[]>([]);
  const [total, setTotal] = useState<number>();
  const loadData = async () => {
    try {
      const res: API.BaseResponsePageChartVO_ = await listChartVOByPageAllUsingPOST(searchParams);
      if (res.code !== 0) {
        throw new Error('后端异常');
      }
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取历史记录失败');
      }
    } catch (e: any) {
      message.error('获取我的图表严重:' + e.message);
    }
  };
  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <PageContainer>
      <div style={{ display: 'grid', placeItems: 'center', marginLeft: '10%', marginRight: '10%' }}>
        <Search
          placeholder={'请输入图表名称'}
          enterButton
          style={{
            fontSize: 30,
            color: '#1677ff',
          }}
          size={'large'}
          onSearch={(value) => {
            setSearchParams({
              ...initSearchParams,
              name: value,
            });
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }} />
      <div
        style={{ backgroundColor: 'white', borderRadius: 10, paddingBottom: 20 }}
        className={'my-chart-page'}
      >
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page, pageSize) => {
              console.log(page);
              setSearchParams({
                ...searchParams,
                current: page,
                pageSize,
              });
            },
            current: searchParams.current,
            pageSize: 3,
            total: total,
          }}
          dataSource={chartList}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={
                item.genChart ? <>
                  <Card style={{ width: 600 }}>
                    <ReactECharts option={JSON.parse(item.genChart ?? '{}')} />
                  </Card>
                </> : <></>
              }
            >
              <List.Item.Meta
                title={item.name}
                description={item.chartType ? '图表类型: ' + item.chartType : undefined}
              />
              {
                <div>
                  <span>
                    <Title level={5}>目标：</Title>
                  </span>
                  <span>{item.goal}</span>
                  <br />
                  <br />
                  <>
                    {
                      item?.status === 0 && <>
                        <Result
                          status="warning"
                          title="待生成"
                          subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                          extra={
                            <Button type="primary" key="console">
                              开通会员加速
                            </Button>
                          }
                        />
                      </>
                    }
                    {
                      item?.status === 1 && <>
                        <Result
                          status="warning"
                          title="待生成"
                          subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                          extra={
                            <Button type="primary" key="console">
                              开通会员加速
                            </Button>
                          }
                        />
                      </>
                    }
                    {
                      item?.status === 2 && <>
                        <span>
                          <Title level={5}>分析结果：</Title>
                        </span>
                        <span>{item.genResult}</span>
                      </>
                    }
                    {
                      item?.status === 3 && <>
                        <Result
                          status="error"
                          title="生成失败"
                          subTitle={item.execMessage ?? '生成失败，请重试'}
                          extra={[
                            <Button key="buy">Try Again</Button>,
                          ]}
                        />
                      </>

                    }
                  </>
                </div>
              }
            </List.Item>
          )}
        />
      </div>
    </PageContainer>
  );
};
export default AllUserHistory;
