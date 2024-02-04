import React from 'react'

const Footer = () => {
  return (
    <div className='site_footer'>
        <div className="container">
            <div className="site_footer_inner">
                <div className="site_footer_brand">
                    <a href="#">
                        <img src="" alt="" />
                    </a>
                </div>
                <div className="footer_copyright">© 2023 Solid, all rights reserved</div>
                <ul className='footer_link list_reset'>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                    <li>
                        <a href="#">About us</a>
                    </li>
                    <li>
                        <a href="#">FAQ's</a>
                    </li>
                    <li>
                        <a href="#">Support</a>
                    </li>
                </ul>
                {/* <ul className='footer_social_link list_reset'>
                <li>
                        <a href="#">
                            <span className='screen_reader_text'>Facebook</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className='screen_reader_text'>Instagram</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className='screen_reader_text'>Twitter</span>
                        </a>
                    </li>
                </ul> */}
            </div>
        </div>
    </div>
  )
}

export default Footer