import { VFC } from 'react'
import { useHistory } from 'react-router-dom'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { TagList } from 'components/TagList'
import { TagEdit } from 'components/TagEdit'

export const MainTag: VFC = () => {
  console.log('MainTag がレンダリングされた')
  const history = useHistory()
  const toTaskPage = () => history.push('/')

  return (
    <>
      <p className="mb-10 text-xl font-bold">Tags</p>
      <div className="grid grid-cols-2 gap-40">
        <TagList />
        <TagEdit />
      </div>
      <ChevronDoubleLeftIcon
        onClick={toTaskPage}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p>Task page</p>
    </>
  )
}
