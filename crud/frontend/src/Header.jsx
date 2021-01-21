import './Header.css';
import React from 'react';

export default props =>
// d-none: Para celulares, o header nao sera exibido'
// d-sm-flex: Acima de tamanho sm, tudo sera flex
<header className="header d-none d-sm-flex flex-column">
    <h1 className="mt-3">
        <i className="fa fa-home"></i>
        {props.title}
    </h1>
    <p className="lead text-muted">{props.subtitle}</p>
    
</header>