import { ChangeEvent, useState, VFC } from 'react'
import { useHistory } from 'react-router-dom'
import { TaskList } from 'components/TaskList'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { TaskEdit } from './TaskEdit'

export const MainTask: VFC = () => {
  console.log('MainTask がレンダリングされた')

  const history = useHistory()
  const toTagsPage = () => history.push('/tags')

  const [text, setText] = useState('')
  const editText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  return (
    <>
      <input
        className="mb-3 px-3 py-2 border border-gray-300"
        placeholder="レンダリング検証用"
        type="text"
        onChange={editText}
        value={text}
      />
      <p className="mb-10 text-xl font-bold">Tasks</p>
      <div className="grid grid-cols-2 gap-40">
        <TaskList />
        <TaskEdit />
      </div>
      <ChevronDoubleRightIcon
        onClick={toTagsPage}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p>Tag page</p>
    </>
  )
}
