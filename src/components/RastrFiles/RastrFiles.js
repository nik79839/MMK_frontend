import { Space, Table, Row, Card,Col, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';

const columns = [
    {
      title: 'Название файла режима',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Время последнего изменения',
      dataIndex: 'lastModified',
      key: 'lastModified',
    }]

const RastrFiles = (props) => { 

    const onChange = (info) => {
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

    return <>
    <Row >
        <Col span="21" >
            <Table columns={columns} dataSource={props.rastrFiles} />;
        </Col>
        <Col span="3" >
        <Upload name ='file' accept=".rg2" action = 'https://localhost:7231/RastrFiles/PostRastrFiles' onChange={onChange} >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
  </Col>
    </Row>
    </>
}

export default RastrFiles