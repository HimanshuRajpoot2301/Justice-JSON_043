import React from 'react';
import style_f from './Footer.module.css';

import { FaTwitter } from 'react-icons/fa';

import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className={style_f.container}>
        <div className={style_f.f_icon}>
          <a href="/">
            {' '}
            <FaTwitter className={style_f.twitter} />
          </a>

          <a href="/">
            {' '}
            <FaFacebookF className={style_f.facebook} />{' '}
          </a>
        </div>

        <div className={style_f.f_cright}>
          <span className={style_f.copyright}>
            {' '}
            © 2024 Travello PVT. LTD.
          </span>
          <span className={style_f.counteryName}>
            {' '}
          Available: 
            <a href="/" className={style_f.country}>
              India
            </a>
            <a href="/" className={style_f.country}>
              USA
            </a>
            <a href="/" className={style_f.country}>
              UAE
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
