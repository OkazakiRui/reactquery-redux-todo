import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useMutateTask } from 'hooks/useMutateTask'
import { useQueryTags } from 'hooks/useQueryTags'
import { ChangeEvent, FormEvent, memo, VFC } from 'react'
import { selectTask, setEditedTask } from 'slices/todoSlice'

export const TaskEdit: VFC = memo(() => {
  console.log('TaskEdit がレンダリングされた')

  const editedTask = useAppSelector(selectTask)
  const dispatch = useAppDispatch()
  const { status, data } = useQueryTags()
  const { createTaskMutation, updateTaskMutation } = useMutateTask()

  const selectElementOnChange = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(setEditedTask({ ...editedTask, tag: Number(e.target.value) }))
  const inputElementOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) createTaskMutation.mutate(editedTask)
    else updateTaskMutation.mutate(editedTask)
  }

  const tagOptions = data?.map((tag) => (
    <option value={tag.id} key={tag.id}>
      {tag.name}
    </option>
  ))

  if (status === 'loading') return <div>loading...</div>
  if (status === 'error') return <div>error</div>
  if (updateTaskMutation.isLoading) return <div>updating...</div>
  if (createTaskMutation.isLoading) return <div>creating...</div>
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="新しいタスクを入力"
          type="text"
          onChange={inputElementOnChange}
          value={editedTask.title}
        />
        <button
          className="disabled:opacity-40 my-3 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
          disabled={!editedTask.title || !editedTask.tag}
        >
          {editedTask.id === 0 ? 'create' : 'update'}
        </button>
      </form>
      <select
        className="mb-3 px-3 py-2 border border-gray-300"
        value={editedTask.tag}
        onChange={selectElementOnChange}
      >
        <option value={0}>Tag</option>
        {tagOptions}
      </select>
    </div>
  )
})
