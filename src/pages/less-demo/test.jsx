import React, { memo } from 'react';

const Index = memo(({ list = [] }) => {
  return (
    <div>
      test: {JSON.stringify(list)}
    </div>
  );
});

export default Index;
