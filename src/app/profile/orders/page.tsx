export default function OrdersPage() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-poppins">My Orders</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-pink-50 text-[#e91e63] rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
          <i className="fa-solid fa-box-open"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">No orders yet</h3>
        <p className="text-gray-500 max-w-sm mx-auto mb-6">You haven&apos;t placed any orders yet. Explore our collection of beautiful gifts and flowers!</p>
        <Link href="/" className="inline-block bg-[#e91e63] text-white px-8 py-3 rounded-xl font-bold shadow-md shadow-pink-200 hover:shadow-lg hover:-translate-y-0.5 transition-all">Start Shopping</Link>
      </div>
    </div>
  );
}
