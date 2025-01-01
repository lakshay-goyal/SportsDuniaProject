import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../redux/actions/newsActions';
import { calculatePayouts } from '../redux/actions/payoutActions';
import { Search, Calendar, Filter, ChevronDown, User, Tag, Clock, DollarSign, Eye, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CardSpotlight } from "../components/ui/card-spotlight";

const MultiSelect = ({ options, selected, onChange, placeholder, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        className="border rounded-lg p-3 flex items-center justify-between cursor-pointer bg-white/40 dark:bg-black/40 border-gray-200 dark:border-white/10" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-gray-600 dark:text-neutral-300" />}
          <span className="text-gray-600 dark:text-neutral-300">
            {selected.length === 0 ? placeholder : `${selected.length} selected`}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-neutral-300 transition-transform ${isOpen ? 'rotate-180' : ''}" />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-white/10 rounded-lg shadow-lg max-h-48 overflow-auto">
          {options.map(option => (
            <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={(e) => onChange(e.target.checked ? [...selected, option] : selected.filter(item => item !== option))}
                className="mr-3 h-4 w-4 rounded border-gray-300 dark:border-neutral-600 text-blue-500"
              />
              <span className="text-gray-700 dark:text-neutral-300">{option}</span>
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

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [addedPayouts, setAddedPayouts] = useState({});

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const uniqueAuthors = useMemo(() => Array.from(new Set(news.map(article => article.author))), [news]);
  const uniqueTypes = useMemo(() => Array.from(new Set(news.map(article => article.type))), [news]);
  const filteredNews = useMemo(() => news.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedAuthors.length === 0 || selectedAuthors.includes(article.author)) &&
    (selectedTypes.length === 0 || selectedTypes.includes(article.type)) &&
    (!startDate || new Date(article.date) >= new Date(startDate)) &&
    (!endDate || new Date(article.date) <= new Date(endDate))
  ), [news, searchTerm, selectedAuthors, selectedTypes, startDate, endDate]);

  const handlePayout = (article) => {
    dispatch(calculatePayouts([article], payoutRate));
    setAddedPayouts(prev => ({ ...prev, [article.id]: true }));
    toast.success(`Payout of $${payoutRate} for "${article.title}" added successfully!`);
  };

  const isPayoutAdded = (articleId) => addedPayouts[articleId] || false;

  if (loading) return (
    <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
    </div>
  );

  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-4 min-h-screen bg-gray-50 dark:bg-black">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-600 dark:text-neutral-300" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/40 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-neutral-300 placeholder-gray-500 dark:placeholder-neutral-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <MultiSelect options={uniqueAuthors} selected={selectedAuthors} onChange={setSelectedAuthors} placeholder="Select Authors" icon={User} />
        <MultiSelect options={uniqueTypes} selected={selectedTypes} onChange={setSelectedTypes} placeholder="Select Types" icon={Tag} />
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-600 dark:text-neutral-300" />
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/40 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-neutral-300"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-600 dark:text-neutral-300" />
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/40 dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-neutral-300"
            />
          </div>
        </div>
      </div>

      {filteredNews.length === 0 ? (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-gray-400 dark:text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
          <p className="text-gray-500 dark:text-neutral-400">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <CardSpotlight
              key={article.id}
              className="h-full bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 group transition-colors"
            >
              <div className="p-6 relative z-20 group-hover:text-white">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4 group-hover:text-white">
                  {article.type}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-white">
                  {article.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-neutral-300 mb-6 group-hover:text-white">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 group-hover:text-white" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 group-hover:text-white" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handlePayout(article)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
                      isPayoutAdded(article.id)
                        ? 'bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-neutral-400 cursor-not-allowed'
                        : 'bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30'
                    } group-hover:text-white`}
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
                    className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white px-3 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 transition-colors group-hover:text-white"
                  >
                    <Eye className="h-4 w-4 group-hover:text-white" />
                    View Details
                  </Link>
                </div>
              </div>
            </CardSpotlight>
          ))}
        </div>
      )}
    </div>
  );
}

export default News;
