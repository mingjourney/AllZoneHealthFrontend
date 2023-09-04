import { useEffect, useState } from 'react'
import axios from 'axios'
import { notification } from 'antd'

function usePublish(type) {
    const { username } = JSON.parse(localStorage.getItem("token"))
    const [dataSource, setdataSource] = useState([])
    useEffect(() => {
        axios(`/knowledge?author=${username}&publishState=${type}&_expand=category`).then(res => {
            setdataSource(res.data)
        })
    }, [username, type])

    const handlePublish = (id) => {
        setdataSource(dataSource.filter(item => item.id !== id))

        axios.patch(`/knowledge/${id}`, {
            "publishState": 2,
            "publishTime": Date.now()
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `您可以到【发布管理/已经发布】中查看您的学习内容`,
                placement: "bottomRight"
            });
        })
    }

    const handleSunset = (id) => {
        setdataSource(dataSource.filter(item => item.id !== id))

        axios.patch(`/knowledge/${id}`, {
            "publishState": 3,
        }).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `您可以到【发布管理/已下线】中查看您的学习内容`,
                placement: "bottomRight"
            });
        })
    }

    const handleDelete = (id) => {
        setdataSource(dataSource.filter(item => item.id !== id))

        axios.delete(`/knowledge/${id}`).then(res => {
            notification.info({
                message: `通知`,
                description:
                    `您已经删除了已下线的学习内容`,
                placement: "bottomRight"
            });
        })

    }

    return {
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete
    }
}

export default usePublish