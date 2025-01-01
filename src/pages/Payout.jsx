import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DollarSign, User, Calendar, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";

function Payout() {
  const payouts = useSelector(state => state.payouts.data);

  const totalPayout = useMemo(() => {
    return payouts.reduce((sum, payout) => sum + payout.amount, 0);
  }, [payouts]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Payout Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Payout
              </CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPayout.toFixed(2)}</div>
              <p className="text-xs opacity-80">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Payout Trend
              </CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12.5%</div>
              <p className="text-xs opacity-80">
                Increase in average payout
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Recent Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            {payouts.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payouts available</h3>
                <p className="text-gray-500 dark:text-gray-400">Add payouts from the News page</p>
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  {payouts.map((payout, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-4 rounded-lg p-4 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700"
                    >
                      <div className="flex-shrink-0">
                        <div className="rounded-full bg-green-500 bg-opacity-10 dark:bg-opacity-20 p-2">
                          <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {payout.articleTitle}
                          </p>
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                            ${payout.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <User className="h-3 w-3 mr-1" />
                          <span className="truncate">{payout.author}</span>
                          <span className="mx-2">•</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{new Date(payout.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Payout;

