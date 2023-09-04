import React, { useEffect,  useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../page/AdminApp/home/Home'
// import RightManage from '../../page/AdminApp/right-manage/RightManage'
// import RoleManage from '../../page/AdminApp/right-manage/RoleManage'
// import UserList from '../../page/AdminApp/user-manage/UserList'
import NoPermission from '../../page/AdminApp/nopermission/NoPermission'
// import axios from 'axios'
// import KnowledgeAdd from '../../page/AdminApp/knowledge-manage/KnowledgeAdd'
// import KnowledgeTemp from '../../page/AdminApp/knowledge-manage/KnowledgeTemp'
// import KnowledgePreview from '../../page/AdminApp/knowledge-manage/KnowledgePreview'
// import KnowledgeUpdate from '../../page/AdminApp/knowledge-manage/KnowledgeUpdate'
import { Spin, message } from 'antd'
import { connect } from 'react-redux'
// import Favorate from '../../page/LearnerApp/favorate/Favorate'
// import PersonalDetail from '../../page/LearnerApp/personal-detail/PersonalDetail'
// import Audit from '../../page/AdminApp/audit-manage/Audit'
// import AuditList from '../../page/AdminApp/audit-manage/AuditList'
// import Published from '../../page/AdminApp/publish-manage/Published'
// import Unpublished from '../../page/AdminApp/publish-manage/Unpublished'
// import Removed from '../../page/AdminApp/publish-manage/Removed'
// import { getUserInfoAndCheckComplete } from '../../utils/validator'
import CompleteInfoPage from '../../page/LearnerApp/complete-Info/CompleteInfoPage'
import { getUserInfo } from '../../api/auth/getUserInfo'
import { handleApiResponse } from '../../utils/apiHelpers'
import TargetEntering from '../../page/AdminApp/persondata-manage/TargetEntering'
import PhysicalSignentry from '../../page/AdminApp/persondata-manage/PhysicalSignentry'
function AdminRouter(props) {

    const [isUserInfoComplete, setIsUserInfoComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // 检查用户信息是否完整
        async function fetchUserInfo() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await getUserInfo(token);
                    const result = handleApiResponse(response);
                    if (result.success) {
                        const { data } = result;
                        console.log(data);
                        const isComplete = Object.entries(data).every(([key, value]) => {
                            if (key === "email" || key === "phone" || key === "username") {
                              return true;
                            }
                            return value !== "";
                          });
                    //只有在成功获取到完整用户信息后才更新状态和打印信息
                        setIsUserInfoComplete(isComplete);
                    } else {
                        message.error(result.message);
                    }
                } catch (error) {
                    message.error(error);
                }
            }
            setIsLoading(false);
        }
        fetchUserInfo();
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
            {!isLoading && (isUserInfoComplete ? (
                <Redirect path="/admin" to="/admin/home" exact />
            ) : (
                <Redirect path="/admin" to="/admin/complete-info" exact />
            ))}
            <Route path="/admin/complete-info" component={CompleteInfoPage} exact />
            <Route path="/admin/home" component={Home} exact />
            <Route path="/admin/persondata-manage/targetEntering" component={TargetEntering} exact/>
            <Route path="/admin/persondata-manage/physicalSignentry" component={PhysicalSignentry} exact/>
            <Route path="*" component={NoPermission} />
        </Switch>
    </Spin>
    )
}
const mapStateToProps = ({ LoadingReducer: { isLoading } }) => {
    return { isLoading };
}
export default connect(mapStateToProps)(AdminRouter)