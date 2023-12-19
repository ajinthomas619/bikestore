import React from 'react';

import Product from '../components/Home/Product';
import Header from '../components/Header/Header';
function Home(props) {
  return (
    <div className="homeParentDiv">
      <Header/>
     <Product/>
     <h1>Welcome to our store!</h1>
    </div>
  );
}

export default Home;
 