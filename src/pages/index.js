import React from 'react';
class index extends React.Component{

  render() {
    return(
      <div>
        <div>{sessionStorage.getItem('user')}</div>

      </div>
    )
  }
}

export default index;
