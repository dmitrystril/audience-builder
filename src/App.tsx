import React from 'react';
import styled from 'styled-components';

import Canvas from './Canvas';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BasicPane = styled.div`
  width: 250px;
  height: 550px;
  border: 2px dashed lightgray;
`;

const App = () => {
  return (
    <Root>
      <BasicPane />

      <Canvas
        height={300}
      />

      <BasicPane />
    </Root>
  );
}

export default App;
