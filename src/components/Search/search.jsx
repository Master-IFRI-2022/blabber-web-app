export default function search({searchQuery}) {
  return (
    <form className="flex items-center my-4 mb-6">   
        <label htmlFor="simple-search" className="sr-only">Search</label>
        <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pcursor-pointer">
                <svg aria-hidden="true" className="w-5 h-6 text-gray-700 hover:cursor-pointer" fillRule="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="simple-search" onChange={(e) => searchQuery(e.target.value)}  className="bg-gray-200  rounded-2xl  text-gray-900 text-sm  focus:border-none focus:outline-none block w-full pl-10 p-2.5" placeholder="Search" required/>
        </div>
    </form>
  )
}
