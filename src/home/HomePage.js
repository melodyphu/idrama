import React from 'react';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  // called the first time the component is rendered by App.js
  componentDidMount() {
    this.setState({

    })
  }

  render() {
    return (
      <div> 
        This is the Home Page.
      </div>
    );
  }
}

export default HomePage;
