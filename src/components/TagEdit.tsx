import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useMutateTag } from 'hooks/useMutateTag'
import { ChangeEvent, FormEvent, memo, VFC } from 'react'
import { selectTag, setEditedTag } from 'slices/todoSlice'

export const TagEdit: VFC = memo(() => {
  console.log('TagEdit がレンダリングされた')

  const editedTag = useAppSelector(selectTag)
  const dispatch = useAppDispatch()
  const { createTagMutation, updateTagMutation } = useMutateTag()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTag.id === 0) createTagMutation.mutate(editedTag)
    else updateTagMutation.mutate(editedTag)
  }

  const inputElementOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setEditedTag({ ...editedTag, name: e.target.value }))

  if (updateTagMutation.isLoading) return <div>updating...</div>
  if (createTagMutation.isLoading) return <div>creating...</div>
  return (
    <form onSubmit={submitHandler}>
      <input
        className="mb-3 px-3 py-2 border border-gray-300"
        placeholder="新しいタグを入力"
        type="text"
        onChange={inputElementOnChange}
        value={editedTag.name}
      />
      <button
        className="disabled:opacity-40 my-3 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded "
        disabled={!editedTag.name}
      >
        {editedTag.id === 0 ? 'create' : 'update'}
      </button>
    </form>
  )
})
