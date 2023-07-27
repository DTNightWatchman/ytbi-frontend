import React, { useEffect } from 'react';
import {message} from "antd";
import {flushSync} from "react-dom";
import {useModel} from "@@/exports";

const WebSocketComponent = () => {
  // WebSocket 连接地址
  const wsUrl = "ws://localhost:8101/api/ws/asset";
  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    let websocket = new WebSocket(wsUrl);

    // 监听 WebSocket 连接打开事件
    websocket.onopen = () => {
      console.log('WebSocket 连接已打开');
      // 在这里可以发送初始消息等操作
    };

    // 监听 WebSocket 接收消息事件
    websocket.onmessage = (event) => {
      //message.info('分析成功');
      console.log('接收到消息：', event.data);
      const res: string = event.data;
      const jsonObject: any = JSON.parse(res);
      const code = jsonObject.code;
      if (code === "0") {
        message.info("建立连接")
        console.log(jsonObject.data);
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            auth: jsonObject.data,
          }));
        });
      } else if (code === '1') {
        message.info(jsonObject.data)
        console.log(jsonObject.data);
      }
      // 在这里处理接收到的消息
    };

    // 监听 WebSocket 连接关闭事件
    websocket.onclose = () => {
      console.log('WebSocket 连接已关闭');
    };

    // 监听 WebSocket 连接错误事件
    websocket.onerror = (error) => {
      console.error('WebSocket 连接错误：', error);
    };

    // 在组件卸载时关闭 WebSocket 连接
    return () => {
      websocket.close();
    };
  }, []);

  return (
    <div>
      {/* 在这里放置你的组件内容 */}
    </div>
  );
};

export default WebSocketComponent;
