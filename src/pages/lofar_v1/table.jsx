import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Table, Input } from 'antd';

const LofarTable = (props) => {
  const { table_data, dispatch } = props;

  const columns = [
    {
      title: '频率',
      key: 'fk',
      dataIndex: 'fk',
    },
    {
      title: '时间',
      dataIndex: 'y_l',
      key: 'y_l',
    },
    {
      title: '幅度',
      dataIndex: 'outdata',
      key: 'outdata',
    },
    {
      title: '低频线谱数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '中心频率',
      dataIndex: 'center_frequency',
      key: 'center_frequency',
      render: () => {
        return (
          <Input placeholder={'请输入中心频率值'} style={{ width: 100 }} />
        );
      },
    },

    {
      title: '操作',
      render: (text, record, index) => (
        <a
          onClick={() => {
            dispatch({
              type: 'lofarTable/setdata',
              payload: {},
              callback: (state) => {
                let copy_data = state.tabledata.slice();
                let curcount = copy_data[0].count;
                for (let i = 0; i < copy_data.length; i++) {
                  copy_data[i].count = curcount - 1;
                }
                copy_data.splice(index, 1);
                return { tabledata: copy_data };
              },
            });
          }}
        >
          删除
        </a>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={table_data}
      style={{ marginTop: '1rem', width: 400 }}
    />
  );
};

const mapStateToProps = ({ lofarTable }) => {
  return {
    table_data: lofarTable.tabledata,
  };
};

export default connect(mapStateToProps)(LofarTable);
