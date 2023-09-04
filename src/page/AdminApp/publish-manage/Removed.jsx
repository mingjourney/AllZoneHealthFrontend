
import { Button } from 'antd'
import KnowledgePublish from '../../../components/publish-manage/KnowledgePublish'
import usePublish from '../../../components/publish-manage/usePublish'
export default function Removed() {

    const { dataSource, handleDelete } = usePublish(3)
    return (
        <div>
            <KnowledgePublish dataSource={dataSource} button={(id) => <Button danger onClick={() => handleDelete(id)}>
                删除
            </Button>}></KnowledgePublish>
        </div>
    )
}
