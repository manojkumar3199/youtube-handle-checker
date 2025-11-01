import { Youtube } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Youtube className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">YouTube Handle Checker</h1>
            <p className="text-gray-600 text-sm">Check the availability of YouTube handles instantly</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;