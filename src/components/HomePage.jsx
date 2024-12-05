import React from 'react';
import fuck from '../assets/img/EBM_pic.jpg'
import '../../src/CSS/style.css';

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>EBM-Electronic-Billing-Machine</h1>
        <p> Making our customers more successful; listening to their needs and working with them to implement solutions that increase both efficiency and profitability</p>
        <a href="/signUp" className="btn btn-primary btn-lg me-3">Get started Here!</a>
        <a href="/login" className="btn btn-secondary btn-lg">Member Login</a>
      </div>
    </div>
  );
};

const MenuSection = () => {
  const menuItems = [
    {
      imgSrc: fuck,
      title: "Customer Service",
      description: " ",
      
    },
    {
      imgSrc: "https://pbs.twimg.com/media/E17DCTgXMAcLfSF?format=jpg&name=medium",
      title: "Announcements",
      
    },
    {
      imgSrc: "https://z-p3-scontent.fkgl3-1.fna.fbcdn.net/v/t1.6435-9/61366272_2742617295765440_7389188343084351488_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=485fgiw1DMIQ7kNvgFUMfYo&_nc_pt=5&_nc_zt=23&_nc_ht=z-p3-scontent.fkgl3-1.fna&_nc_gid=A1k1j2m_xt9Yl8bxFJg-6At&oh=00_AYC7xThy-Xhy6gPSNJc7IK8GeEfGC3babpqIBstaP0bFwg&oe=6773CB4C",
      title: "News & Events",
     
    }
  ];

  return (
    <div className="menu-section">
      <div className="container">
        <h2 className="text-center mb-5">ABOUT</h2>
        <div className="row">
          {menuItems.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="menu-item">
                <img src={item.imgSrc} alt={item.altText} />
                <h5>{item.title}</h5>
                <p>{item.description}</p>
                <p className="price">{item.price}</p>
                {/* <button className="btn">Order Now</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <MenuSection />
    </div>
  );
};

export default HomePage;
