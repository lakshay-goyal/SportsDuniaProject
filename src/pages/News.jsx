import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../redux/actions/newsActions';
import { calculatePayouts } from '../redux/actions/payoutActions';
import { Search, Calendar, Filter, ChevronDown, User, Tag, Clock, DollarSign, Eye, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MultiSelect = ({ options, selected, onChange, placeholder, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="border rounded-lg p-3 flex items-center justify-between cursor-pointer bg-white shadow-sm hover:border-blue-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-gray-500" />}
          <span className="text-gray-700">
            {selected.length === 0 ? placeholder : `${selected.length} selected`}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-48 overflow-auto">
          {options.map(option => (
            <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
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
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

function News() {
  const dispatch = useDispatch();
  const news = useSelector(state => state.news.articles);
  const loading = useSelector(state => state.news.loading);
  const error = useSelector(state => state.news.error);
  const payoutRate = useSelector(state => state.payouts.rate);
  const payouts = useSelector(state => state.payouts.data);

  console.log('News Component - Current payouts:', payouts);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //const [clickedPayoutId, setClickedPayoutId] = useState(null); //Removed

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

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
      (!startDate || new Date(article.date) >= new Date(startDate)) &&
      (!endDate || new Date(article.date) <= new Date(endDate))
    );
  }, [news, searchTerm, selectedAuthors, selectedTypes, startDate, endDate]);

  const handlePayout = (article) => {
    console.log('Handling payout for article:', article);
    dispatch(calculatePayouts([article], payoutRate));
    console.log('Payout action dispatched');
    toast.success(`Payout of $${payoutRate} for "${article.title}" added successfully!`);
  };

  const isPayoutAdded = (articleId) => {
    const isPaid = payouts.some(payout => payout.articleId === articleId);
    console.log(`Checking if article ${articleId} is paid:`, isPaid);
    return isPaid;
  };

  if (loading) return (
    <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
    </div>
  );

  if (error) return (
    <div className="text-red-500 p-4">Error: {error}</div>
  );

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <MultiSelect
          options={uniqueAuthors}
          selected={selectedAuthors}
          onChange={setSelectedAuthors}
          placeholder="Select Authors"
          icon={User}
        />
        <MultiSelect
          options={uniqueTypes}
          selected={selectedTypes}
          onChange={setSelectedTypes}
          placeholder="Select Types"
          icon={Tag}
        />
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {filteredNews.length === 0 ? (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(article => (
            <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {article.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handlePayout(article)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
                      isPayoutAdded(article.id)
                        ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    disabled={isPayoutAdded(article.id)}
                  >
                    {isPayoutAdded(article.id) ? (
                      <>
                        <Check className="h-4 w-4" />
                        Added
                      </>
                    ) : (
                      <>
                        <DollarSign className="h-4 w-4" />
                        Payout
                      </>
                    )}
                  </button>
                  <Link
                    to={`/article/${article.id}`}
                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default News;