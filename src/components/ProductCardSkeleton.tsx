export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[#EBEBEB] flex flex-col overflow-hidden animate-pulse">
      <div className="h-[160px] bg-[#f0f0f0]" />
      <div className="p-3 flex flex-col flex-1">
        <div className="w-16 h-3 bg-gray-200 rounded mb-1" />
        <div className="w-full h-8 bg-gray-200 rounded mb-1" />
        <div className="w-20 h-2 bg-gray-200 rounded mb-2" />
        <div className="mt-auto pt-2">
          <div className="w-12 h-3 bg-gray-200 rounded mt-1 mb-1" />
          <div className="w-24 h-5 bg-gray-200 rounded mb-2" />
          <div className="w-full h-9 bg-gray-200 rounded-[10px]" />
        </div>
      </div>
    </div>
  );
}
