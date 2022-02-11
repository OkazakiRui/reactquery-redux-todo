import { useAppDispatch } from 'app/hooks'
import { useMutateTask } from 'hooks/useMutateTask'
import { VFC } from 'react'
import { Task } from 'types/types'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { setEditedTask } from 'slices/todoSlice'

type Props = {
  task: Task
}
export const TaskItem: VFC<Props> = ({ task }) => {
  console.log('TaskItem がレンダリングされた')

  const { deleteTaskMutation } = useMutateTask()
  const deleteTaskHandler = () => deleteTaskMutation.mutate(task.id)

  const dispatch = useAppDispatch()
  const editedTaskHandler = () =>
    dispatch(
      setEditedTask({
        id: task.id,
        title: task.title,
        tag: task.tag,
      })
    )

  if (deleteTaskMutation.isLoading) return <div>deleting...</div>

  return (
    <li className="my-3" key={task.id}>
      <span className="font-bold">{task.title}</span>
      <span>
        {' : '}
        {task.tag_name}
      </span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={editedTaskHandler}
        />
        <TrashIcon
          className="h-5 w-5 text-blue-500 cursor-pointer"
          onClick={deleteTaskHandler}
        />
      </div>
    </li>
  )
}
