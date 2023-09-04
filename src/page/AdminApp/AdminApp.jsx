import React, { useEffect } from 'react'
import AdminHeader from '../../components/adminHeader/AdminHeader'
import AdminSideBar from '../../components/adminSideBar/AdminSideBar'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Layout } from 'antd'
import './AdminApp.css'
import AdminRouter from '../../components/admin-router/AdminRouter'
const { Content } = Layout;
export default function AdminApp() {
    
    useEffect(() => {
        nProgress.start();
        nProgress.done();
      }, []);

    return (
        <Layout style={{minHeight: "100vh"}}>
            <AdminSideBar />
            <Layout className="site-layout">
                <AdminHeader />
                <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                    <AdminRouter />
                </Content>
            </Layout>
        </Layout>
    )
}
