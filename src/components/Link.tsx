import React from 'react';

interface Props {
  className?: string;
  title?: string;
  href: string;
}

const Link: React.FC<Props> = ({ className, title, href, children }) => {
  return (
    <a
      className={className}
      title={title}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default Link;
