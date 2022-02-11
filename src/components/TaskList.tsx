import { useQueryTasks } from 'hooks/useQueryTasks'
import { VFC } from 'react'
import { TaskItem } from './TaskItem'

export const TaskList: VFC = () => {
  console.log('TaskList がレンダリングされた')

  const { status, data } = useQueryTasks()
  if (status === 'loading') return <div>loading...</div>
  if (status === 'error') return <div>error</div>

  return (
    <ul>
      {data?.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </ul>
  )
}
