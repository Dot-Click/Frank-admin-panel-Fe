import React from 'react';
import { DownOutlined, LoginOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import toast from 'react-hot-toast';


const DropdownMenu: React.FC = () => {
  const navigate = useNavigate()
  const { data } = useMe()

  const handleLogout = async () => {
   localStorage.removeItem("token")
   localStorage.removeItem("user")
   toast.success("logout Successfully")
   navigate("/")
  }
  
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Logout',
      icon: <LoginOutlined />,
      onClick: () => handleLogout()
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      className="mr-10"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space style={{ color: '#fff' }}>
          {data?.name}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

export default DropdownMenu;