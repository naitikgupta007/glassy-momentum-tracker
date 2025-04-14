
import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '@/components/GlassCard';
import GlassButton from '@/components/GlassButton';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="max-w-md w-full text-center py-12 animate-fade-in">
        <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <GlassButton 
            icon={<Home size={18} />}
            variant="primary"
            className="mx-auto"
          >
            Back to Dashboard
          </GlassButton>
        </Link>
      </GlassCard>
    </div>
  );
};

export default NotFound;
