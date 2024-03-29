import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import s from './Graphics.module.css';
import { statisticBaseType } from '../../../types/types';

type PropsType = {
  characters: statisticBaseType
  measure: string
};

const StatisticCharacter: React.FC<PropsType> = (props) => (
  <div className="site-statistic-demo-card">
    <Row gutter={16} style={{height:"14vh", marginRight:'2px', verticalAlign: 'text-top'}}>
      <Col span={6}>
        <Card bordered={false} style={{height:"12vh"}} className={s.characters}>
          <Statistic title="Мат ожидание" value={props.characters?.mean} precision={2} valueStyle={{color: '#3f8600',}} suffix={props.measure}/>
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false} style={{height:"12vh"}} className={s.characters}>
          <Statistic title="Минимум" value={props.characters?.minimum} precision={2} valueStyle={{color: '#3f8600',}} suffix={props.measure}/>
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{height:"12vh"}} className={s.characters}>
          <Statistic title="Максимум" value={props.characters?.maximum} precision={2} valueStyle={{color: '#3f8600',}} suffix={props.measure}/>
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{height:"12vh"}} className={s.characters}>
          <Statistic title="СКО" value={props.characters?.stD} precision={2} valueStyle={{color: '#3f8600',}}/>
        </Card>
      </Col>
    </Row>
  </div>
);
export default StatisticCharacter;