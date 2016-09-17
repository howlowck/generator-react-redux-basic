import React, { Component } from 'react';
<% if (cssModules) { %>
import style from './style.css';
<% } %>  

class Title extends Component {
    render() {
        return (
            <h1 <% if (cssModules) { %>className={ style.title }<% } %> { ...this.props } />
        )
    }
}

export default Title;
