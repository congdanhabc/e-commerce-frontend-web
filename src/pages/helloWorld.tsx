import { useState } from "react";

export default function HelloWorldPage() {
    const [count, setCount] = useState(0);
    return(
    <div className="min-w-full h-100 text-center pt-50">
        <div className="text-5xl">
            Hello World
        </div>
        <br />
        <div className="text-2xl">
            <button onClick={() => setCount(count + 1)} className="p-3 bg-white text-black border-2 rounded-2xl hover:bg-black hover:text-white transition-colors duration-300">
                Click
            </button>
            <div>
                Count: {count}
            </div>
        </div>
    </div>
    );
}