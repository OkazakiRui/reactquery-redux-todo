import { useQueryTags } from 'hooks/useQueryTags'
import { memo, VFC } from 'react'
import { TagItem } from 'components/TagItem'

export const TagList: VFC = memo(() => {
  console.log('TagList がレンダリングされた')

  const { status, data } = useQueryTags()
  if (status === 'loading') return <div>loading...</div>
  if (status === 'error') return <div>error</div>
  return (
    <ul>
      {data?.map((tag) => (
        <TagItem tag={tag} key={tag.id} />
      ))}
    </ul>
  )
})
