
import { Button } from 'antd'
import KnowledgePublish from '../../../components/publish-manage/KnowledgePublish'
import usePublish from '../../../components/publish-manage/usePublish'

export default function Published() {
    const { dataSource, handleSunset } = usePublish(2)

    return (
        <div>
            <KnowledgePublish dataSource={dataSource} button={(id) => <Button danger onClick={() => handleSunset(id)}>
                下线
            </Button>}>

            </KnowledgePublish>
        </div>
    )
}
