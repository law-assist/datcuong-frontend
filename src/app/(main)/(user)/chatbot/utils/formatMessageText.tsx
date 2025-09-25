
import React from 'react';

const formatMessageText = (text: string) => {
  const paragraphs = text.split('\n\n').map((paragraph, pIndex) => {
    const lines = paragraph.split('\n');
    let inList = false;
    const formattedLines = lines.map((line, lIndex) => {
      if (line.trim().startsWith('*')) {
        inList = true;
        return <li key={`${pIndex}-${lIndex}`}>{line.trim().slice(1).trim()}</li>;
      } else if (line.trim() === '' && inList) {
        inList = false;
        return null;
      } else {
        return <p key={`${pIndex}-${lIndex}`} style={{ margin: '0.5em 0' }}>{line.trim()}</p>;
      }
    });

    return (
      <div key={pIndex} style={{ marginBottom: '1em' }}>
        {inList ? <ul style={{ margin: '0.5em 0', paddingLeft: '20px' }}>{formattedLines}</ul> : formattedLines}
      </div>
    );
  });

  return <>{paragraphs}</>;
};

export default formatMessageText;
