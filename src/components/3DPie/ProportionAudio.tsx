/*
 * author: TimothyZhung
 * date: 2020-11-03
 */

import { Card, Row, Col, Divider } from 'antd';
import React, { Suspense } from 'react';
import styles from './style.less';
import { Pie3D } from 'react-pie3d';
export interface VisitDataType {
  x: string;
  y: number;
}
const CONFIG = {
  angle: 40,
  height: 25,
  ir: 0.6,
  moveDistance: 0.2,
  onClick: function (e: any) {
    return null;
  },
  showTooltips: !0,
  size: 1.2,
  stroke: 'white',
  strokeWidth: 1,
  tooltipShowName: !0,
  tooltipShowPercentage: !0,
  tooltipShowValue: !0,
};

const ProportionAudio = ({
  audioPieData,
}: {
  audioPieData: VisitDataType[];
}) => (
  <Card
    loading={false}
    className={styles.audioCard}
    bordered={false}
    title="声音类型占比"
    style={{
      height: '100%',
    }}
  >
    <div>
      <Row gutter={20} style={{ height: '100%' }}>
        <Col span={16} style={{ height: '100%' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#292929',
              float: 'left',
            }}
          >
            <Pie3D
              config={CONFIG}
              data={[
                {
                  value: audioPieData[0].y,
                  label: 'active_pulse',
                  color: '#faebd7',
                },
                {
                  value: audioPieData[1].y,
                  label: 'target_echo',
                  color: '#ff7f50',
                },
                {
                  value: audioPieData[2].y,
                  label: 'radiated_noise',
                  color: '#cd5c5c',
                },
              ]}
            />
          </div>
        </Col>
        <Col span={8} style={{ height: '100%' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#292929',
              float: 'left',
            }}
          >
            <ul className={styles.legend}>
              {audioPieData.map((item, i) => (
                <li key={item.x}>
                  <span
                    className={styles.dot}
                    style={{
                      backgroundColor:
                        item.x === 'active_pulse'
                          ? '#faebd7'
                          : item.x === 'target_echo'
                          ? '#ff7f50'
                          : '#cd5c5c',
                    }}
                  />
                  <span className={styles.legendTitle}>{item.x}</span>
                  <Divider type="vertical" />
                  <span className={styles.percent}>
                    {`${(Number.isNaN(item.y)
                      ? 0
                      : (item.y /
                          audioPieData.reduce(
                            (total, item) => total + item.y,
                            0,
                          )) *
                        100
                    ).toFixed(2)}%`}
                  </span>
                  <span className={styles.value}>{item.y}</span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  </Card>
);

export default ProportionAudio;
