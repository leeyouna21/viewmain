import React from 'react'

const Price = () => {
  const handleClick = (event) => {
    event.stopPropagation();
    
  };
  return (
    <div className='Price'>
        <div className="container">
            <h2>Unlimited for all</h2>
            <p>Our planning app offers the advantage of effortlessly managing your schedule with ease and speed. Streamline your daily activities and tasks quickly, allowing for efficient and seamless schedule management</p>
            <div className="pricing_wrap">
              <div className="pricing_table">
                <div className="pricing_table_inner">
                  <div className="pricing_table_main">
                    <div className="pricing_table_header">
                      <div className="pricing_table_price">
                        <span className='price_dollar'>$</span>
                        <span className='price_amount'>49</span>
                        <span className='price_month'>/month</span>
                      </div>
                    </div>
                    <div className="pricing_title">What you will get
                      <ul className='pricing_list'>
                        <li><span>Lorem ipsum dolor sit nisi</span></li>
                        <li><span>Lorem ipsum dolor sit nisi</span></li>
                        <li><span>Lorem ipsum dolor sit nisi</span></li>
                        <li><span>Lorem ipsum dolor sit nisi</span></li>
                      </ul>
                    </div>
                    <div className="pricing_button">
                      <a href="#" onClick={handleClick}><button className='rendPri_btn'>PRE ORDER NOW</button></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Price