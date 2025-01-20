import { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface IChat {
  content: string;
  author: "bot" | "human";
  image: string;
  firstName: string;
}

interface CodeBlockProps {
  code: string;
  language: string;
}

interface ContentPart {
  type: 'text' | 'code';
  content: string;
  language?: string;
}

const BOT_IMAGE = "https://avatars.githubusercontent.com/ml/14048?s=82&v=4";

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden my-4 border border-gray-700 w-full max-w-4xl">
      <div className="flex justify-between items-center bg-editor-bg px-4 py-2 border-b border-gray-700">
        <span className="text-gray-300 text-sm font-mono">{language || 'text'}</span>
        <button
          onClick={copyToClipboard}
          className="px-3 py-1 text-sm text-gray-300 hover:text-white bg-gray-700 rounded-md transition-colors duration-200"
        >
          {copied ? "Copied! ✓" : "Copy code"}
        </button>
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        <SyntaxHighlighter
          language={language || 'text'}
          style={vs2015}
          customStyle={{
            margin: 0,
            padding: '1rem',
            backgroundColor: '#1e1e1e',
            fontSize: '14px',
            lineHeight: '1.5',
            width: '100%',
            minWidth: '300px',
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const parseContent = (content: string): ContentPart[] => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts: ContentPart[] = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      });
    }

    // Add code block
    parts.push({
      type: 'code',
      language: match[1] || 'text',
      content: match[2].trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex),
    });
  }

  return parts;
};

export const SingleChat = ({ author, content, image, firstName }: IChat) => {
  const contentParts = parseContent(content);

  return (
    <div
      className="flex items-start gap-4 mb-6 px-4"
      style={{
        justifyContent: author === "bot" ? "flex-start" : "flex-end",
        flexDirection: author === "human" ? "row" : "row-reverse",
      }}
    >
      <img
        alt="Avatar"
        className="rounded-full h-10 w-10 bg-white flex-shrink-0 border-2 border-gray-200 dark:border-gray-700"
        height="40"
        src={author === "bot" ? BOT_IMAGE : image}
        style={{
          aspectRatio: "40/40",
          objectFit: "cover",
        }}
        width="40"
      />
      <div className="flex flex-col max-w-[85%] w-full">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 px-1">
          {author === "bot" ? "AI" : firstName}
        </span>
        <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-md border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200">
          <div className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
            {contentParts.map((part, index) => (
              part.type === 'code' ? (
                <CodeBlock 
                  key={index} 
                  code={part.content} 
                  language={part.language || 'text'} 
                />
              ) : (
                <p key={index} className="my-2 whitespace-pre-wrap">
                  {part.content}
                </p>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};