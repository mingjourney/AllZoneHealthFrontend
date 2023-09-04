import React, { useEffect } from 'react';
import { Layout } from 'antd';
import UserHeader from '../../components/userHeader/UserHeader';
import nProgress from 'nprogress';
import './learnerApp.css'
import UserRouter from '../../components/user-router/UserRouter';
const {  Content} = Layout;

function LearnerApp(props) {
    useEffect(() => {
        nProgress.start();
        nProgress.done();
      }, []);
   

    return (
        <Layout className="layout">
            <UserHeader/>
            <Content style={{ padding: '0 50px' }}>  
                <UserRouter/>                    
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>
                ChatGPT 健康平台 ©2023 Created by ChatGPT
            </Footer> */}
        </Layout>
    );
}

export default LearnerApp;
