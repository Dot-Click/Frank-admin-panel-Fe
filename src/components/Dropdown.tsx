import React from 'react';
import { DownOutlined, LoginOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';


const DropdownMenu: React.FC = () => {
  const navigate = useNavigate()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Logout',
      icon: <LoginOutlined />,
      onClick: ()=> navigate("/")
    },
  ];
  return(
  <Dropdown
    menu={{ items }}
    placement="bottom"
    className="mr-10"
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Admin
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
  )
}

export default DropdownMenu;