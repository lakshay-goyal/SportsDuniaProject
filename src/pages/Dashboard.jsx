import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchNews } from '../redux/actions/newsActions';
import { updatePayoutRate, calculatePayouts } from '../redux/actions/payoutActions';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { CSVLink } from 'react-csv';
import html2pdf from 'html2pdf.js';
import { ChevronDown, Calendar, Search, DollarSign, FileText, Download, Users, LogOut } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const MultiSelect = ({ options, selected, onChange, placeholder, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="border rounded-lg p-3 flex items-center justify-between cursor-pointer bg-white dark:bg-gray-800 shadow-sm hover:border-blue-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
          <span className="text-gray-700 dark:text-gray-300">
            {selected.length === 0 ? placeholder : `${selected.length} selected`}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-auto">
          {options.map(option => (
            <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={(e) => {
                  const newSelected = e.target.checked
                    ? [...selected, option]
                    : selected.filter(item => item !== option);
                  onChange(newSelected);
                }}
                className="mr-3 h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-gray-700 dark:text-gray-300">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoaded, signOut } = useUser();
  const news = useSelector(state => state.news.articles);
  const loading = useSelector(state => state.news.loading);
  const error = useSelector(state => state.news.error);
  const payoutData = useSelector(state => state.payouts.data);
  const payoutRate = useSelector(state => state.payouts.rate);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const handleSignOut = async () => {
    try {
      await signOut();
      // Force a page refresh after sign out
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }};

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    if (news.length > 0) {
      const filteredNews = news.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedAuthors.length === 0 || selectedAuthors.includes(article.author)) &&
        (selectedTypes.length === 0 || selectedTypes.includes(article.type)) &&
        (!dateRange.start || new Date(article.date) >= new Date(dateRange.start)) &&
        (!dateRange.end || new Date(article.date) <= new Date(dateRange.end))
      );
      dispatch(calculatePayouts(filteredNews, payoutRate));
    }
  }, [dispatch, news, payoutRate, searchTerm, selectedAuthors, selectedTypes, dateRange]);

  const uniqueAuthors = useMemo(() => 
    Array.from(new Set(news.map(article => article.author)))
  , [news]);

  const uniqueTypes = useMemo(() => 
    Array.from(new Set(news.map(article => article.type)))
  , [news]);

  const filteredNews = useMemo(() => {
    return news.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedAuthors.length === 0 || selectedAuthors.includes(article.author)) &&
      (selectedTypes.length === 0 || selectedTypes.includes(article.type)) &&
      (!dateRange.start || new Date(article.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(article.date) <= new Date(dateRange.end))
    );
  }, [news, searchTerm, selectedAuthors, selectedTypes, dateRange]);

  const chartData = useMemo(() => {
    const typeData = filteredNews.reduce((acc, article) => {
      acc[article.type] = (acc[article.type] || 0) + 1;
      return acc;
    }, {});

    const authorData = filteredNews.reduce((acc, article) => {
      acc[article.author] = (acc[article.author] || 0) + 1;
      return acc;
    }, {});

    return {
      barChart: {
        labels: Object.keys(typeData),
        datasets: [{
          label: 'Articles by Type',
          data: Object.values(typeData),
          backgroundColor: 'rgba(99, 102, 241, 0.6)',
          borderColor: 'rgb(99, 102, 241)',
          borderWidth: 1,
        }],
      },
      pieChart: {
        labels: Object.keys(authorData),
        datasets: [{
          data: Object.values(authorData),
          backgroundColor: [
            'rgba(99, 102, 241, 0.6)',
            'rgba(139, 92, 246, 0.6)',
            'rgba(236, 72, 153, 0.6)',
            'rgba(248, 113, 113, 0.6)',
            'rgba(251, 146, 60, 0.6)',
            'rgba(250, 204, 21, 0.6)',
          ],
          borderColor: [
            'rgb(99, 102, 241)',
            'rgb(139, 92, 246)',
            'rgb(236, 72, 153)',
            'rgb(248, 113, 113)',
            'rgb(251, 146, 60)',
            'rgb(250, 204, 21)',
          ],
          borderWidth: 1,
        }],
      },
    };
  }, [filteredNews]);

  const exportPDF = () => {
    const element = document.getElementById('payout-table');
    const opt = {
      margin: 1,
      filename: 'payout-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent" />
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
      Error: {error}
    </div>
  );

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Dashboard</h1>
          <div className="flex gap-3 items-center">
            <button
              onClick={exportPDF}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Export PDF
            </button>
            <CSVLink
              data={payoutData.map(p => ({
                Author: p.author,
                Articles: p.articleCount,
                Payout: `$${p.amount.toFixed(2)}`
              }))}
              filename="payout-report.csv"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </CSVLink>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
          <MultiSelect
            options={uniqueAuthors}
            selected={selectedAuthors}
            onChange={setSelectedAuthors}
            placeholder="Select Authors"
            icon={Users}
          />
          <MultiSelect
            options={uniqueTypes}
            selected={selectedTypes}
            onChange={setSelectedTypes}
            placeholder="Select Types"
            icon={FileText}
          />
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={payoutRate}
              onChange={(e) => dispatch(updatePayoutRate(parseFloat(e.target.value) || 0))}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              min="0"
              step="0.01"
              placeholder="Payout Rate ($)"
            />
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Content Distribution</h3>
            <div className="h-64">
              <Bar data={chartData.barChart} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Author Distribution</h3>
            <div className="h-64">
              <Pie data={chartData.pieChart} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Payout Table */}
        <div id="payout-table" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Payout Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Articles</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payoutData.length > 0 ? (
                  payoutData.map(payout => (
                    <tr key={payout.author} className="hover:bg-gray-50 dark:hover:bg-black">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{payout.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{payout.articleCount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">${payout.amount.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-sm text-gray-500 text-center">No payout data available</td>
                  </tr>
                )}
              </tbody>
              {payoutData.length > 0 && (
                <tfoot className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <td colSpan="2" className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">Total Payout:</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                      ${payoutData.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

