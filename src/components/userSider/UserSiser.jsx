import React from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';

export default function MySider({ menuItems, selectKeys, openKeys }) {
  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        selectedKeys={selectKeys}
        defaultOpenKeys={openKeys}
        items={menuItems}
        style={{
          height: '100%',
        }}
      />
    </Sider>
  );
}
