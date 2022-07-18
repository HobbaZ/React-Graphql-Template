import React from 'react';

import { FooterStyle } from '../styles/GenericStyles';

//Change year automatically
function year() {
  let date = new Date();
  return date.getFullYear();
}

const Footer = () => {
return (
  <FooterStyle>
      <h4>React GRAPHQL Template, {year()} </h4>
      <div className='icons'>
          <a href="https://www.linkedin.com/in/zachary-hobba-52aaa182/"><i className="fab fa-linkedin"></i></a>
          <a href="mailto:zachobba@gmail.com"><i className="fas fa-envelope-square"></i></a>
          <a href="https://github.com/HobbaZ"><i className="fab fa-github"></i></a>
      </div>
  </FooterStyle>
);
};

export default Footer;