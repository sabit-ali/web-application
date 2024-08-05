
import SearchDialog from './SearchDialog'
import ThreadsCards from '@/components/card/ThreadsCards'

export default function Threads() {
  return (
    <div className=' h-full w-full'>
        <SearchDialog/>
        <div className='px-2 w-full h-[580px]'>
          <ThreadsCards/>
        </div>
    </div>
  )
}
