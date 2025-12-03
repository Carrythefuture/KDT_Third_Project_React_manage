
import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
const data = [
    {
        key: '1',
        id: "asd",
        name: 'John Brown',
        nickName: 'johnadsvadvad',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Joe Black',
        nickName: 'john',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Jim Green',
        nickName: 'john',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        nickName: 'john',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '5',
        name: 'Jim Red',
        nickName: 'john',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '6',
        name: 'Jim Red',
        nickName: 'john',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '7',
        name: 'Jim Red',
        nickName: 'john',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '8',
        name: 'Jim Red',
        nickName: 'john',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '9',
        name: 'Jim Red',
        nickName: 'john',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '10',
        name: 'Jim Red',
        nickName: 'john',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '11',
        name: 'Jim Red',
        nickName: 'john',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '12',
        name: 'Jim Red',
        nickName: 'john',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const BlackPage = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const handleBlackBtn = (record) => {
        console.log(record);
    }

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: '아이디',

            dataIndex: 'id',
            key: 'id',
            width: '10%',
            ...getColumnSearchProps('id'),
            onHeaderCell: () => ({
                style: { textAlign: 'center' },
            }),
            ellipsis: true,
        },
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
            width: '10%',
            ...getColumnSearchProps('name'),
            onHeaderCell: () => ({
                style: { textAlign: 'center' },
            }),
            ellipsis: true,
        },
        {
            title: '닉네임',
            dataIndex: 'nickName',
            key: 'nickName',
            width: '10%',
            ...getColumnSearchProps('nickName'),
            onHeaderCell: () => ({
                style: { textAlign: 'center' },
            }),
            ellipsis: true,
        },
        {
            title: '사유',
            dataIndex: 'reason',
            key: 'reason',
            width: '40%',
            onHeaderCell: () => ({
                style: { textAlign: 'center' },
            }),
            ellipsis: true,

        },
        {
            title: '해제',
            key: 'black',
            width: '5%',
            render: (_, record) => (
                <Button danger onClick={() => handleBlackBtn(record)}>
                    해제
                </Button>
            ),
            align: 'center',
            onHeaderCell: () => ({
                style: { textAlign: 'center' },
            }),
            ellipsis: true,
        },
    ];
    return <Table columns={columns} pagination={{ placement: ['bottomCenter'] }} bordered dataSource={data} />;
};

export default BlackPage;