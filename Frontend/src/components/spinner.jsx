const DotLoader = () => {
    return (
        <div className="flex gap-1 items-center justify-center m-3.5 mt-5">
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:0.15s]"></div>
            <div className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:0.3s]"></div>
        </div>
    );
};

export default DotLoader;