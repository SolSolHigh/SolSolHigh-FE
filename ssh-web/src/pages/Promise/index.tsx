import React from 'react';

export const PromiseTicket: React.FC = () => {
  return (
    <div className="p-4 bg-blue-100 min-h-screen flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">보유한 약속권</h2>
          <div className="flex items-center space-x-2">
            <span className="text-lg">1</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold">TICKET</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-lg text-gray-500">+</span>
            </div>
            <span className="mt-2 text-sm text-gray-600">약속 요청하기</span>
          </div>

          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-lg bg-cover bg-center"
              style={{ backgroundImage: "url('/path/to/image3.jpg')" }}
            >
              <div className="w-full h-full bg-red-600 bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-bold text-xl">확인</span>
              </div>
            </div>
            <span className="mt-2 text-sm text-blue-600">햄스터 키우기</span>
          </div>
        </div>
      </div>
    </div>
  );
};
