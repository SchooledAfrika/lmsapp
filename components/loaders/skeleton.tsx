export const GetClassLoader = () => {
  const myArrays = new Array(6).fill(10);

  return (
    <div className=" w-full px-4 pt-16 pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {myArrays.map((item, index) => (
        <div
          className=" flex flex-col w-full animate-pulse  rounded-md overflow-hidden"
          key={index}
        >
          <div className=" w-full h-[200px]  bg-slate-500 relative border border-black">
            <div className=" absolute w-[100px] h-[40px] rounded-lg bg-slate-600 bottom-0 left-4 transform translate-y-1/2 "></div>
          </div>
          <div className=" w-full h-[200px] bg-slate-500 flex flex-col gap-3 pt-16 px-4">
            <div className=" w-full flex gap-2 ">
              <div className=" flex-3 h-[30px] bg-slate-600 rounded-lg"></div>
              <div className=" flex-1 h-[30px] bg-slate-600 rounded-lg"></div>
            </div>
            <div className=" rounded-lg w-1/2 h-[30px] bg-slate-600"></div>
            <div className=" rounded-lg w-1/2 h-[30px] bg-slate-600"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
