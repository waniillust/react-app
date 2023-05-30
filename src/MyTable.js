import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import './antd/dist/antd.css';

const MyTable = () => {
  const [data, setData] = useState([
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', salary: 50000 },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', salary: 60000 },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', salary: 70000 },
  ]);

  // define columns for the table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      editable: true,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (text, record) => (
        <SalaryInput value={record.salary} handleSaveRow={(values) => handleSaveRow(record.key, values)} />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <EditRowModal rowData={record} handleSaveRow={handleSaveRow} />
          <Popconfirm title="Are you sure?" onConfirm={() => handleDeleteRow(record.key)}>
            <Button>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  // function to handle deleting row
  const handleDeleteRow = (key) => {
    const filteredData = data.filter((row) => row.key !== key);
    setData(filteredData);
  };

  // function to handle editing row
  const handleSaveRow = (key, values) => {
    const { salary, age } = values;
    const newAge = salary * age;
  
    const updatedData = data.map((row) => {
      if (row.key === key) {
        return { ...row, ...values, age: newAge };
      } else {
        return row;
      }
    });
  
    setData(updatedData);
  };

  // define state variables for form modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // function to handle adding new row
  const handleAddRow = () => {
    setIsModalVisible(true);
  };

  // function to handle submitting form
  const handleFormSubmit = (values) => {
    const newRow = {
      key: Math.random().toString(36).substr(2, 9),
      name: values.name,
      age: values.age,
      address: values.address,
      salary: values.salary,
    };

    setData([...data, newRow]);
    setIsModalVisible(false);
  };

  // function to handle canceling form
  const handleFormCancel = () => {
    setIsModalVisible(false);
  };

  // calculate age based on salary
  useEffect(() => {
    const updatedData = data.map((row) => {
      const { salary } = row;
      const age = Math.floor(salary * 42);

      return { ...row, age };
    });

    setData(updatedData);
  }, [data]);

  return (
    <div>
      <Button onClick={handleAddRow}>Add Row</Button>
      <Table dataSource={data} columns={columns} />

      <Modal title="Add Row" visible={isModalVisible} onCancel={handleFormCancel} onOk={() => form.submit()}>
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter a name" />
          </Form.Item>
          <Form.Item label="Age" name="age" rules={[{ required: true }, { type: 'number', min: 1, max: 120 }]}>
            <Input placeholder="Enter an age" type="number" />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Input placeholder="Enter an address" />
          </Form.Item>
          <Form.Item label="Salary" name="salary" rules={[{ required: true }]}>
            <Input placeholder="Enter a salary" type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const SalaryInput = ({ value, handleSaveRow }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    handleSaveRow({ salary: newValue });
  };

  return <Input value={inputValue} onChange={handleChange} />;
};

const EditRowModal = ({ rowData, handleSaveRow }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSaveModal = () => {
    form
      .validateFields()
      .then((values) => {
        handleSaveRow(rowData.key, values);
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Edit</Button>
      <Modal title="Edit Row" visible={isModalVisible} onCancel={handleCloseModal} onOk={handleSaveModal}>
        <Form form={form} initialValues={rowData}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter a name" />
          </Form.Item>
          <Form.Item label="Age" name="age" rules={[{ required: true }]}>
            <Input placeholder="Enter an age" type="number" />
          </Form.Item>
          <Form.Item label="Address" name="address" rules={[{ required: true }]}>
            <Input placeholder="Enter an address" />
          </Form.Item>
          <Form.Item label="Salary" name="salary" rules={[{ required: true }]}>
            <Input placeholder="Enter a salary" type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyTable;
