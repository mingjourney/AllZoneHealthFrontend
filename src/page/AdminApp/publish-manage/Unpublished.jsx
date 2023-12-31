
import { Button } from 'antd'
import KnowledgePublish from '../../../components/publish-manage/KnowledgePublish'
import usePublish from '../../../components/publish-manage/usePublish'

export default function Unpublished() {
    // 1=== 待发布的
    const { dataSource, handlePublish } = usePublish(1)

    return (
        <div>
            <KnowledgePublish dataSource={dataSource} button={(id) => <Button type="primary" onClick={() => handlePublish(id)}>
                发布
            </Button>} ></KnowledgePublish>
        </div>
    )
}
