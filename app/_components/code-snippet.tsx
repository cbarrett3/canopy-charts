'use client'

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface CodeSnippetProps {
   code: string;
   language?: string;
   showLineNumbers?: boolean;
   className?: string;
   showCopyButton?: boolean;
}

const customStyle = {
   ...vscDarkPlus,
   'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: 'rgba(30, 41, 59, 0.98)',
      borderRadius: '1rem',
      padding: '1.5rem',
      margin: '1rem 0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      fontSize: '0.9rem',
      lineHeight: '1.5',
   },
   'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      textShadow: 'none',
   },
   'pre[class*="language-"]::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
   },
   'pre[class*="language-"]::-webkit-scrollbar-track': {
      background: 'rgba(148, 163, 184, 0.1)',
      borderRadius: '4px',
   },
   'pre[class*="language-"]::-webkit-scrollbar-thumb': {
      background: 'rgba(148, 163, 184, 0.2)',
      borderRadius: '4px',
      '&:hover': {
         background: 'rgba(148, 163, 184, 0.3)',
      },
   },
};

const CodeSnippet: React.FC<CodeSnippetProps> = ({
   code,
   language = 'typescript',
   showLineNumbers = true,
   className = '',
   showCopyButton = true,
}) => {
   const [copied, setCopied] = useState(false);

   const handleCopy = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div className={`relative group ${className}`}>
         {/* Gradient border effect */}
         <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-sky-500/30 opacity-20 group-hover:opacity-30 transition-opacity rounded-lg blur"></div>
         
         {/* Code container */}
         <div className="relative">
            {showCopyButton && (
               <button
                  onClick={handleCopy}
                  className="absolute right-4 top-4 p-2 rounded-md bg-slate-700/50 hover:bg-slate-700/70 transition-colors text-slate-300 hover:text-white"
                  title="Copy code"
               >
                  {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
               </button>
            )}
            
            <SyntaxHighlighter
               language={language}
               style={customStyle}
               showLineNumbers={showLineNumbers}
               wrapLines={true}
               customStyle={{
                  margin: 0,
                  background: 'transparent',
                  backdropFilter: 'blur(8px)',
               }}
               lineNumberStyle={{
                  minWidth: '2.5em',
                  paddingRight: '1em',
                  color: 'rgba(148, 163, 184, 0.4)',
                  textAlign: 'right',
                  userSelect: 'none',
               }}
            >
               {code}
            </SyntaxHighlighter>
         </div>
      </div>
   );
};

export default CodeSnippet;
