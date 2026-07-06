function Navbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">

      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Admin Dashboard
        </h2>
      </div>

      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="font-medium text-gray-700">
            Administrator
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
          A
        </div>
      </div>

    </header>
  );
}

export default Navbar;