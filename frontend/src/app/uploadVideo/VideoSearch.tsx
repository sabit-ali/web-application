
import axios from 'axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'


import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "react-router-dom"

export default function VideoSearch() {
  const [data, setData] = useState([])
  const [query, setQuery] = useState('')
  const debounced = useDebounceCallback(setQuery, 1000)
  const abortController = new AbortController()


  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    debounced(e.target.value)

  }

  useEffect(() => {
    if (query) {
      (async () => {
        const value = query
        await axios.get('/api/v1/videos/video', {
          params: {
            searchString: value
          },
          signal: abortController.signal
        })
          .then((data) => {
            setData(data.data.data)
          })


      })()
    } else {
      setData([])
    }

    return () => {
      abortController.abort()
    }

  }, [query])

console.log("video", data)
  return (
    <Dialog>
      <DialogTrigger asChild>
      <form className=" w-72 border mx-auto">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            
            readOnly
            type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
          <span  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</span>
        </div>
        </form>
      </DialogTrigger>
      <DialogContent className="max-w-[725px]">
      <form className=" w-[500px] border mx-auto">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            defaultValue={query}
            onChange={handleSearchQuery}
            type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
        </form>

        <div className=' w-full h-40  z-40 border rounded-md overflow-hidden flex flex-col justify-center items-center md:max-w-2xl mx-auto gap-3 py-4  shadow-md overflow-y-auto'>
            {query.trim() !== "" && (
              <>
                {data?.map((fields: any) => (
                  <div key={fields?._id} className=''>
                    <Link to={`/onevideo/${fields._id}`} className=' flex gap-4 justify-center items-center '>
                    <img src={fields?.thumbnail} alt={fields?.title} className=' h-12 w-12 rounded-full object-cover' />
                      <h1 className=' hover:text-neutral-500 underline font-serif font-semibold '>{fields?.title}</h1>
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>

      </DialogContent>
    </Dialog>
  )
}