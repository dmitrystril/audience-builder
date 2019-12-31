import React from 'react';
import styled from 'styled-components';

import Canvas from './Canvas';

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => {
  return (
    <Root>
      <Canvas />
    </Root>
  );
}

export default App;
