import React from 'react';
import CardButton from './CardButton';

class Home extends React.Component {
  render() {
    return (
      <div>
        <input type="text" />
        <CardButton />
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      </div>
    );
  }
}

export default Home;
