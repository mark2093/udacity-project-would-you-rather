
import React, { Component } from 'react'

import { connect } from 'react-redux'

class NotFound  extends Component {
 
  render() {
    return (
    <h1 className='page404'>404 / Not Found</h1>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return { authedUser }
}


export default connect(mapStateToProps)(NotFound)