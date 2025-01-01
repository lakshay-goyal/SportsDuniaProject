import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DollarSign, User, Calendar, FileText } from 'lucide-react';

function Payout() {
  const payouts = useSelector(state => state.payouts.data);

  useEffect(() => {
    console.log('Payout Component - Current payouts:', payouts);
  }, [payouts]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Payout Page</h2>
      {payouts.length === 0 ? (
        <p className="text-gray-600">No payouts available.</p>
      ) : (
        <div className="grid gap-4">
          {payouts.map((payout, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-lg">${payout.amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(payout.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{payout.author}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <FileText className="h-4 w-4" />
                <span>{payout.articleTitle}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Payout;