export default function AddressesPage() {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-poppins">My Addresses</h2>
        <button className="flex items-center gap-2 text-[#e91e63] bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-xl font-bold text-sm transition-colors">
          <i className="fa-solid fa-plus"></i> Add New
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-[#e91e63] bg-pink-50/30 p-5 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow">
          <span className="absolute top-4 right-4 bg-white text-xs font-bold px-2 py-1 rounded shadow-sm text-[#e91e63] border border-pink-100">Default</span>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-[#e91e63]">
              <i className="fa-solid fa-house text-sm"></i>
            </div>
            <h3 className="font-bold text-gray-900">Home</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-5 mt-2">
            123 Gifting Avenue, Block B<br/>
            Near Rose Garden, Mumbai<br/>
            Maharashtra - 400001
          </p>
          <div className="flex gap-3">
            <button className="text-sm font-semibold text-gray-600 hover:text-[#e91e63] bg-white border border-gray-200 px-4 py-1.5 rounded-lg shadow-sm hover:border-pink-200 transition-colors">Edit</button>
            <button className="text-sm font-semibold text-red-500 hover:text-red-700 bg-white border border-gray-200 px-4 py-1.5 rounded-lg shadow-sm hover:border-red-200 transition-colors">Delete</button>
          </div>
        </div>
        <div className="border-2 border-dashed border-gray-200 hover:border-[#e91e63] bg-gray-50 hover:bg-pink-50 p-5 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all min-h-[200px] group">
          <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#e91e63] transition-all duration-300">
            <i className="fa-solid fa-plus text-[#e91e63] group-hover:text-white transition-colors"></i>
          </div>
          <p className="font-bold text-gray-600 group-hover:text-[#e91e63]">Add New Address</p>
        </div>
      </div>
    </div>
  );
}
