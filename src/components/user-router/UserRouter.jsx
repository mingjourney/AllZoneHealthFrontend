import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import Home from '../../page/LearnerApp/home/Home';
import MenuGenerator from '../../page/LearnerApp/menu-generator/MenuGenerator';
import NoPermission from '../../page/AdminApp/nopermission/NoPermission'
import Planning from '../../page/LearnerApp/Planning/Planning';
import Consultation from '../../page/LearnerApp/consultation/Consultation';
import Course from '../../page/LearnerApp/course/Course';
import CourseDetail from '../../page/LearnerApp/course/CourseDetail';

function UserRouter(props) {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 检查用户信息是否完整
        setIsLoading(false);
    }, []);
    // const localRouterMap = useMemo(() => {
    //     return {
    //         "/home": Home,
    //         "/user-manage/list": UserList,
    //         "/right-manage/role/list": RoleManage,
    //         "/right-manage/right/list": RightManage,
    //         "/knowledge-manage/add": KnowledgeAdd,
    //         "/knowledge-manage/temp": KnowledgeTemp,
    //         "/knowledge-manage/preview/:id": KnowledgePreview,
    //         "/knowledge-manage/update/:id": KnowledgeUpdate,
    //         "/favorate": Favorate,
    //         "/personal-detail": PersonalDetail,
    //         "/audit-manage/audit": Audit,
    //         "/audit-manage/list": AuditList,
    //         "/publish-manage/unpublished": Unpublished,
    //         "/publish-manage/published": Published,
    //         "/publish-manage/removed": Removed,
    //         "/completeInfo": CompleteInfoPage,
    //     };
    // }, []);
    // const { role: { rights } } = JSON.parse(localStorage.getItem("token"));

    // const [backendRouteList, setBackendRouteList] = useState([]);
    // useEffect(() => {
    //     Promise.all([
    //         axios.get(`/rights`),
    //         axios.get(`/children`)
    //     ]).then(
    //         res => {
    //             setBackendRouteList([...res[0].data, ...res[1].data]);
    //         }
    //     )
    // }, [])
    return (
        <Spin tip="Loading" size="small" spinning={isLoading} >
        <Switch>
            {/* 路由渲染 */}
            {/* {backendRouteList.map((item) => {
                if ((item.pagepermission || item.routepermission) && rights.includes(item.key) && localRouterMap[item.key]) {
                    return <Route path={item.key} key={item.key} component={localRouterMap[item.key]} exact />
                }
                return null;
            })} */}
            <Route path="/" component={Home} exact />
            <Route path="/menu-generator" component={MenuGenerator}/>
            <Route path="/planning" component={Planning}/>
            <Route path="/consultation" component={Consultation} exact/>
            <Route path="/course/:courseId" component={CourseDetail} exact/>
            <Route path="/course" component={Course}/>            
            <Route path="*" component={NoPermission} />
        </Switch>
    </Spin>
    )
}
const mapStateToProps = ({ LoadingReducer: { isLoading } }) => {
    return { isLoading };
}
export default connect(mapStateToProps)(UserRouter)