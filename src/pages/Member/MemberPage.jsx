import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Modal, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { caxios } from '../../config/config';
import TextArea from 'antd/es/input/TextArea';

const MemberPage = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);


  // modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [reasonText, setReasonText] = useState('');

  const handleOpenBlackModal = (record) => {
    setSelectedRecord(record);
    setReasonText(''); // 초기화
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
    setReasonText('');
  };

  const handleConfirmBlack = async () => {
    if (!selectedRecord) return;
    if (!reasonText || reasonText.trim().length === 0) {
      message.error('차단 사유를 입력하세요.');
      return;
    }

    setModalLoading(true);
    try {
      const res = await caxios.post('/black', {
        id: selectedRecord.id,
        reason: reasonText.trim(),
      });

      setData(prev =>
        prev.map(user =>
          user.id === selectedRecord.id
            ? { ...user, black: "true" }
            : user
        )
      );
      message.success('차단 처리되었습니다.');
      handleCancelModal();
    } catch (err) {
      console.error(err);
      message.error('차단 처리 중 오류가 발생했습니다.');
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
  const columns = useMemo(() => [
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
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      ellipsis: true,
    },
    {
      title: '핸드폰',
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      ellipsis: true,
    },
    {
      title: '생년월일',
      dataIndex: 'birth',
      key: 'birth',
      width: '20%',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      ellipsis: true,
    },
    {
      title: '블랙',
      key: 'black',
      width: '5%',
      render: (_, record) => {
        if (record.black === "true") {
          return <div>블랙 유저</div>; // ✅ 이미 블랙이면 버튼 안 보여줌
        }

        return (
          <Button danger onClick={() => handleOpenBlackModal(record)}>
            블랙
          </Button>
        );
      },
      align: 'center',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      ellipsis: true,
      filters: [
        {
          text: '일반 유저',
          value: 'false',
        },
        {
          text: '블랙 유저',
          value: 'true',
        },
      ],
      onFilter: (value, record) => record.black.indexOf(value) === 0,
    },
  ], [searchText, searchedColumn]);

  useEffect(() => {
    const getMemberList = async () => {
      try {
        const res = await caxios.get("/member"); // 서버에서 JWT 검증
        console.log(res);

        setData(res.data);
      } catch (err) {
        //sessionStorage.removeItem("token"); // ❌ 위조/만료 토큰이면 삭제
        console.log("에러");
      }
    };

    getMemberList();
  }, [])

  return (
    <>
      <Table columns={columns} pagination={{ placement: ['bottomCenter'] }} bordered dataSource={data} />

      <Modal
        title={`정말 ${selectedRecord?.id} 님을 블랙하시겠습니까?`}
        open={isModalVisible}
        onOk={handleConfirmBlack}
        onCancel={handleCancelModal}
        confirmLoading={modalLoading}
        okText="확인"
        cancelText="취소"
      >
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>차단 사유</label>
          <TextArea
            value={reasonText}
            onChange={(e) => setReasonText(e.target.value)}
            rows={4}
            placeholder="사유를 입력하세요"
            style={{ resize: 'none' }}
          />
        </div>
      </Modal>
    </>
  );
};
export default MemberPage;