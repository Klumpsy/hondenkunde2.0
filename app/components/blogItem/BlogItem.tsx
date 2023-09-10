import Image from "next/image";

const BlogItem = ({blogItem}: any) => {
      return (
        <div className=" mt-10 p-2 w2/5 shadow-lg rounded-lg h-auto w-80 md:w-80 cursor-pointer m-auto p-4 bg-indigo-50 transition duration-500 ease-in-out transform hover:translate-y-5 hover:shadow-2xl">
        <a href={`/blog/${blogItem.id}`} className="w-full block h-full">
        {/* <Image
          src={`127.0.0.1:8090/${blogItem.image}`}
          alt="Logo"
          width={"110"}
          height={"45"}
          className="relative"
        /> */}
            <div className="w-full">
                <p className="text-indigo-500 text-md font-medium">
                    {blogItem.title}
                </p>
                <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                    {/* {blogItem.tags} */}
                </p>
                <p className="text-gray-600 dark:text-gray-300 font-light text-md">
                    {blogItem.content.substring(0, 100)}
                </p>
                <div className="flex flex-wrap justify-starts items-center mt-4 border-t-2 pt-5">
                   {blogItem.tags.map((tag) => (
                        <div key={blogItem.id + tag} className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-200 rounded-2xl">
                            {tag}
                        </div>
                   ))}
                </div>
            </div>
        </a>
    </div>
)};

export default BlogItem;