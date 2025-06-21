import React, { useState } from 'react';
import type { ReactNode } from 'react';

interface TabProps {
  title: ReactNode;
  children: ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
}

export const Tabs = ({ children }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-neutral-700 mb-4">
        {children.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-t text-sm font-medium transition-colors duration-200 ${
              activeIndex === index
                ? 'bg-neutral-800 text-white border-b-2 border-blue-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div>{children[activeIndex]}</div>
    </div>
  );
};

export const Tab = ({ children }: TabProps) => <div>{children}</div>;
