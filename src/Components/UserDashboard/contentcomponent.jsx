import React from 'react';

const ContentComponent = ({ selected }) => {
  switch (selected) {
    case 'dashboard':
      return <h2>Dashboard Content</h2>;
    case 'chat':
      return <h2>Chat Section</h2>;
    case 'cart':
      return <h2>Shopping Cart</h2>;
    case 'settings':
      return <h2>Settings</h2>;
    default:
      return <h2>Select an option</h2>;
  }
};

export default ContentComponent;