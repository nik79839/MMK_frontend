import { Table, Upload, Button, message, Popconfirm, Space } from 'antd';
import { UploadOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import s from './RastrFiles.module.css';
import { ColumnsType } from 'antd/lib/table';
import { fileType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { getRastrFiles } from '../../redux/rastrFiles-reducer';
import { Dispatch } from 'redux';

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

export const RastrFiles: React.FC = () => { 

  const [spin, setSpin] = useState(true);
  const rastrFiles = useSelector((state: AppStateType) => state.rastrFilesPage.rastrFiles);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getRastrFiles());
    setSpin(false);
  },[])
  
  const onChange = (info: any) => {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} файл загружен успешно`);
          dispatch(getRastrFiles());
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }

    return (
    <div className={s.table}>
            <Table loading={spin} columns={columns} dataSource={rastrFiles} />   
            <Upload name ='file' accept=".rg2" action = 'https://localhost:7231/RastrFiles/PostRastrFiles' onChange={onChange} >
              <Button style={{float: 'right', marginLeft: '775px'}} type="primary" icon={<UploadOutlined />}>Загрузить файл режима</Button>
            </Upload>
    </div>)}