import { Carousel, Input, Menu } from 'antd';
import axios from 'axios';
// import { set } from 'nprogress';
import { useEffect, useState } from 'react';
import "./learnerApp.css"
import {
    UserOutlined,
} from '@ant-design/icons'
export default function LearnerApp(props) {

    const items = [
        {
            label: '首页',
            key: '/learnerhome',
            onClick: (item) => {
                props.history.push(item.key)
            }
        },
        {
            label: '',
            key: '/audio-learning',
            onClick: (item) => {
                props.history.push(item.key)
            }
        },
        {
            label: '文章学习',
            key: '/article-learning',
            // render: (item) => {
            //     return <a href={item.label}>{item.lable}</a>
            // }
            onClick: (item) => {
                props.history.push(item.key)
            }
        },
        {
            label: '视频学习',
            key: '/video-learning',
            onClick: (item) => {
                props.history.push(item.key)
            }
        },
        {
            label: (
                <a style={{ color: "#fff" }} href=" https://www.chinese-learning.cn/#/web" target="_blank" rel="noopener noreferrer">
                    参考网站
                </a >
            ),
            key: 'alipay',
        },
    ];
    const [topImages, setTopImages] = useState([]);
    const [totalUserNum, setTotalUserNum] = useState([]);
    const [totalCountryNum, setTotalCountryNum] = useState(0);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        axios.get(`/img`).then(
            (res) => {
                setTopImages(res.data);
            }
        )
    }, [])
    useEffect(() => {
        axios.get(`/users`).then(
            (res) => {
                setTotalUserNum(res.data.length);
            }
        )
    }, [])
    useEffect(() => {
        axios.get(`/countries`).then(
            (res) => {
                setTotalCountryNum(res.data.length);
            }
        )
    }, []);
    useEffect(() => {
        axios.get(`/knowledge?publishState=2&_expand=category`).then(res => {
            console.log(res.data);
        })
    })
    const handleUserClick = () => {
        if (localStorage.getItem("token")) {
            props.history.push("/home");
        } else {
            props.history.push("/login");
        }
    }
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div className="learn-container">
            <div className="logo">
                <a href={`#/learnerhome`}>
                    <img src='./image/logo-formal2.png' alt='logo' />
                </a>
            </div>
            <Input value={inputValue} onChange={(item) => {
                setInputValue(item.target.value)
            }} style={{ right: "100px", top: "23px", zIndex: 999, borderRadius: "20px", position: "absolute", width: "180px", backgroundColor: "#fff", opacity: 0.35 }} />
            <UserOutlined onClick={() => handleUserClick()} style={{ width: "30px", zIndex: 999, right: "30px", top: "33px", position: "absolute" }} />
            <div className="imgList">
                <Carousel autoplay>
                    {topImages.map((item) => {
                        return <img key={item.id} src={item.src} alt={item.title} />
                    })}
                </Carousel>
            </div>
            <Menu className="custom-menu" style={{ fontWeight: 400 }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
            <div className="bottom-line">
                <div className="item">
                    <div className="item-left">
                        <div className='title'>
                            平台用户总数
                        </div>
                        <div className="eg">
                            total platform user
                        </div>
                    </div>
                    <div className="item-right">
                        {totalUserNum}
                    </div>
                </div>
                <div className="item">
                    <div className="item-left">
                        <div className='title'>
                            覆盖国家/地区数
                        </div>
                        <div className="eg">
                            country covered
                        </div>
                    </div>
                    <div className="item-right">
                        {totalCountryNum}
                    </div>
                </div>
            </div>
        </div>
    )
}
