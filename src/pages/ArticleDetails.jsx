import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';

const ArticleDetails = () => {
  const { id } = useParams();
  const article = useSelector(state => 
    state.news.articles.find(a => a.id.toString() === id)
  );

  if (!article) {
    return <div className="text-center py-12">Article not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/news" className="flex items-center text-blue-500 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to News
      </Link>
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="flex items-center gap-4 text-gray-600 mb-6">
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>{article.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{new Date(article.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="w-4 h-4" />
          <span>{article.type}</span>
        </div>
      </div>
      <div className="prose max-w-none">
        <p>{article.description}</p>
        {article.content && <p>{article.content}</p>}
        {article.url && (
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Read full article
          </a>
        )}
      </div>
    </div>
  );
};

export default ArticleDetails;

