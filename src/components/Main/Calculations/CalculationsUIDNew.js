import  CalculationProgress  from './CalculationProgress';
import  CalculationItem  from './CalculationItem';
import { Tabs, List } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import s from './Calculations.module.css';
import { ProList } from '@ant-design/pro-components';
import { Badge, Button } from 'antd';
import React, { useState } from 'react';


const { TabPane } = Tabs;

const CalculationsUIDNew = (props) => { 
        
    const calculationReady =[];
    const calculationProcess =[];
    
    for (let i = 0; i<props.calculations?.calculations?.length; i++) {
        if (props.calculations.calculations[i].calculationEnd != null)  {
            calculationReady.push(props.calculations.calculations[i]);
        }
        else{
            calculationProcess.push(props.calculations.calculations[i]);
        }
    }
    
    const deleteCalculationById = (id) => {
        props.deleteCalculationById(id);
       }
       
    
       const dataSource = [
        {
          name: '实验名称1',
          desc: '系统性的沉淀B端知识体系',
          content: [
            {
              label: '模型数',
              value: 2903,
            },
            {
              label: '指标数',
              value: 3720,
            },
            {
              label: '实验状态',
              value: '成功',
              status: 'success',
            },
          ],
        },
      ];
    
       const renderBadge = (count, active = false) => {
        return (
          <Badge
            count={count}
            style={{
              marginBlockStart: -2,
              marginInlineStart: 4,
              color: active ? '#1890FF' : '#999',
              backgroundColor: active ? '#E6F7FF' : '#eee',
            }}
          />
        );
      };

        const [activeKey, setActiveKey] = useState('tab1');

        return (
          <ProList rowKey="name" dataSource={calculationReady}
            metas={{
              title: {
                dataIndex: 'name',
              },
              description: {
                dataIndex: 'calculationEnd',
              },
              
              actions: {
                render: (text, row) => [
                  <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="link">
                    编辑
                  </a>,
                  <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="warning">
                    复制
                  </a>,
                  <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="view">
                    删除
                  </a>,
                ],
              },
            }}
            toolbar={{
              menu: {
                activeKey,
                items: [
                  {
                    key: 'tab1',
                    label: <span>Завершено{renderBadge(99, activeKey === 'tab1')}</span>,
                  },
                  {
                    key: 'tab2',
                    label: <span>В процессе{renderBadge(32, activeKey === 'tab2')}</span>,
                  },
                ],
                onChange(key) {
                  setActiveKey(key);
                },
              },
              search: {
                onSearch: (value) => {
                  alert(value);
                },
              },
            }}
          />
        );
      };

      export default CalculationsUIDNew;
