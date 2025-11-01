import React from 'react';
import { Github, Heart, Info } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Main Footer Content */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-gray-600">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-gray-600">for the YouTube community</span>
            </div>
            <p className="text-sm text-gray-500">
              Check YouTube handle availability instantly and efficiently
            </p>
          </div>

          {/* Info Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>How it works:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>We check multiple endpoints to verify handle availability</li>
                  <li>Results are cached during your session for efficiency</li>
                  <li>Rate limiting ensures we don't overwhelm YouTube's servers</li>
                  <li>Handles are checked in batches for optimal performance</li>
                </ul>
                <p className="mt-2">
                  <strong>Note:</strong> Results are based on public information and may not reflect the most current status.
                  Always verify with YouTube directly before making decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              © 2024 YouTube Handle Checker. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-4 h-4 mr-1" />
                Source Code
              </a>
              <span className="text-sm text-gray-400">
                Built with React & TypeScript
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;