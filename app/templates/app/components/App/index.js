import React, { Component } from 'react';
<% if (cssModules) { %>
import style from './style.css';  
<% } %>  
import Title from '../Title';

class App extends Component {
    render() {
        return (
            <div>
                <Title>Hello World</Title>
            </div>)
    }
}

export default App;
