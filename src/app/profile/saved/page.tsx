export default function SavedItemsPage() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">Saved Items</h2>
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
          <i className="fa-regular fa-heart text-3xl text-[#e91e63]"></i>
          <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
            <div className="w-4 h-4 bg-[#e91e63] rounded-full animate-pulse"></div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 max-w-sm mx-auto mb-6">Save your favorite gifts by clicking the heart icon on any product to easily find them later.</p>
        <button className="bg-[#e91e63] text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">Explore Gifts</button>
      </div>
    </div>
  );
}
