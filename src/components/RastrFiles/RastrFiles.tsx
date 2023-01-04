import { Table, Upload, Button, message, Popconfirm, Space } from 'antd';
import { UploadOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import s from './RastrFiles.module.css';
import { ColumnsType } from 'antd/lib/table';
import { fileType } from '../../types/types';

const columns: ColumnsType<fileType> = [
    {
      title: 'Название файла режима',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Время последнего изменения',
      dataIndex: 'lastModified',
      key: 'lastModified',
      
    },
    {
      title: ' ',
      key: 'action',
      render: (_, record) => (
          <Space>
          <a>{<DownloadOutlined style={{color: 'blue'}}/>}</a>
          <Popconfirm title="Подвердите удаление">
            <a>{<DeleteOutlined style={{color: 'red'}}/>}</a>
          </Popconfirm>
          </Space>
      ),
    },];

type PropsType = {
  rastrFiles: Array<fileType>
  spin: boolean
  getRastrFiles: () => void
    };

const RastrFiles: React.FC<PropsType> = (props) => { 

  const onChange = (info: any) => {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} файл загружен успешно`);
          props.getRastrFiles();
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }

    return (
    <div className={s.table}>
            <Table loading={props.spin} columns={columns} dataSource={props.rastrFiles} />   
            <Upload name ='file' accept=".rg2" action = 'https://localhost:7231/RastrFiles/PostRastrFiles' onChange={onChange} >
              <Button style={{float: 'right', marginLeft: '775px'}} type="primary" icon={<UploadOutlined />}>Загрузить файл режима</Button>
            </Upload>
    </div>)}

export default RastrFiles