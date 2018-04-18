import React from 'react';
class index extends React.Component{
  render() {
    return(
      <div style={{width:'100%',overflow:'hidden',height: '100vh'}}>
        <img src={require('../assets/404.jpg')} width='100%' alt="404"/>
      </div>
    )
  }
}

export default index;
