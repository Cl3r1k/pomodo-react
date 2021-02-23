import React, { useRef } from 'react';

// Component to track renders amount
// The idea - used 'div.container' with inner div-content with position 'absolute'
// so 'div.container' don't effect on a component size in which it used
// used inline styles to reduce amount of splitting
// Don't forget, that this component affects on DOM by placing container
// e.g. it will affect on flex of Grids elements

export const RenderCounter: React.FC = () => {
  const renderRef = useRef(0);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '0 3px',
          borderRadius: '3px',
          fontSize: '10px',
          color: '#ffffff',
          backgroundColor: '#38a0a0',
        }}
      >
        renders: <strong>{renderRef.current++}</strong>
      </div>
    </div>
  );
};
