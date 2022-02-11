import { useAppDispatch } from 'app/hooks'
import { useMutateTag } from 'hooks/useMutateTag'
import { memo, VFC } from 'react'
import { Tag } from 'types/types'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { setEditedTag } from 'slices/todoSlice'

type Props = {
  tag: Tag
}
export const TagItem: VFC<Props> = memo(({ tag }) => {
  console.log('TagItem がレンダリングされた')

  const dispatch = useAppDispatch()
  const editedTagHandler = () => {
    dispatch(
      setEditedTag({
        id: tag.id,
        name: tag.name,
      })
    )
  }

  const { deleteTagMutation } = useMutateTag()
  const deleteTagHandler = () => deleteTagMutation.mutate(tag.id)

  if (deleteTagMutation.isLoading) return <div>deleting...</div>
  return (
    <li className="my-3">
      <span className="font-bold">{tag.name}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={editedTagHandler}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={deleteTagHandler}
        />
      </div>
    </li>
  )
})
