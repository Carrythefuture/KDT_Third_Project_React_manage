
import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { caxios } from '../../config/config';
import TextArea from 'antd/es/input/TextArea';

const BlackPage = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    // modal state
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    

    const handleOpenBlackModal = (record) => {
        setSelectedRecord(record);
        setIsModalVisible(true);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
        setSelectedRecord(null);
    };

    const handleConfirmBlack = async () => {
        if (!selectedRecord) return;

        setModalLoading(true);
        try {
            const res = await caxios.post('/black/cancel', {
                id: selectedRecord.id
            });

            setData(prev =>
                prev.filter(user => user.id !== selectedRecord.id)
            );
            message.success('블랙이 해제되었습니다.');
            handleCancelModal();
        } catch (err) {
            console.error(err);
            message.error('블랙 해제 처리 중 오류가 발생했습니다.');
            // 만약 토큰 문제 등으로 세션 초기화가 필요하면 여기에 처리
        } finally {
            setModalLoading(false);
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };


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
            dataIndex: 'nickname',
            key: 'nickname',
            width: '10%',
            ...getColumnSearchProps('nickname'),
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
            title: '차단일',
            dataIndex: 'created_at',
            key: 'created_at',
            width: '20%',
            onHeaderCell: () => ({
                style: { textAlign: 'center' },
            }),
            ellipsis: true,

        },
        {
            title: '관리자',
            dataIndex: 'admin_id',
            key: 'admin_id',
            width: '10%',
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
                <Button danger onClick={() => handleOpenBlackModal(record)}>
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

    useEffect(() => {
        const getBlackList = async () => {
            try {
                const res = await caxios.get("/black"); // 서버에서 JWT 검증
                console.log(res);

                setData(res.data);
            } catch (err) {
                //sessionStorage.removeItem("token"); // ❌ 위조/만료 토큰이면 삭제
                console.log("에러");
            }
        };

        getBlackList();
    }, [])

    return (
        <>
            <Table columns={columns} pagination={{ placement: ['bottomCenter'] }} bordered dataSource={data} />;
            <Modal
                title={`정말 ${selectedRecord?.id}님의 블랙을 해제하시겠습니까?`}

                open={isModalVisible}
                onOk={handleConfirmBlack}
                onCancel={handleCancelModal}
                confirmLoading={modalLoading}
                okText="확인"
                cancelText="취소"
            >
            </Modal>
        </>
    );

};

export default BlackPage;