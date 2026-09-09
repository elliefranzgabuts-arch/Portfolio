function TailwindPractice() {
    return (
        <div className="pt-24 space-y-2">

                {/*Grid Practice*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <p>Grid item 1</p>
                <p>Grid item 2</p>
                <p>Grid item 3</p>
                <p>Grid item 4</p>
            </div>

            {/* Text Practice */}
            <div>
                <h1>Tailwind Practice</h1>

                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl">
                    Responsive Text
                </h2>

                <p className="text-white">
                    This is Tailwind
                </p>
                <p className="text-red-500 font-bold">Bold black text</p>
                <p className="text-4xl">Large text</p>
                <p className="font-semibold">Semi-bold text</p>
                <p className="text-center">Centred text</p>
                <p className="p-4">Text with padding</p>
                <p className="px-4 md:px-10 lg:px-20">
                    Responsive padding
                </p>
                <p className="m-4">Text with margin</p>
                <p className="mt-8">Top margin</p>
            </div>

            {/* Responsive Layout Practice*/}
            <div className="w-full min-h-screen bg-red-500 border rounded-2xl shadow-xl">
                <div className="w-full min-h-screen bg-red-800">
                    Photo Area
                </div>

                <div className="w-full h-40 bg-gray-800">
                    Content Area
                </div>
            </div>

            <div>   
                <button className="bg-red-700 text-white px-6 py-3 rounded-full transition duration-600 hover:bg-red hover:-translate-y-1 shadow-xl">
                    Press me!
                </button>
            </div>

                {/* Project Card */}
            <div className="max-w-sm p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg transition duration-300 hover:-translate-y-1 hover:border-red-500">
                <p className="text-red-500 text-sm font-semibold">
                    PROJECT
                </p>

                <h3 className="text-white text-2xl font-bold mt-2">
                    Our Little World
                </h3>

                <p className="text-gray-400 mt-3">
                    A personal website built with HTML, CSS, and JavaScript.
                </p>

                <button className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg transition duration-300 hover:bg-red-600">
                    View Project
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <label>
                    Name    
                </label>

                <input
                    type="text"
                    placeholder="Enter your name"
                    className="border border-gray-600 rounded-lg p-3 bg-gray-900 text-white outline-none focus:border-red-500"
                />
            </div>

            <div className="flex space-x-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded">
                    One
                </button>

                <button className="bg-gray-800 text-white px-4 py-2 rounded">
                    Two
                </button>
            </div>

        </div>
    );
}

export default TailwindPractice;