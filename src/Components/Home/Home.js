import React, { Component } from 'react';
import './Home.scss';
import Slideshow from '../Slideshow/Slideshow';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas, faPhone} from '@fortawesome/free-solid-svg-icons'
import PopularItems from '../PopularItems/PopularItems';
import axios from 'axios';
import Footer from '../Footer/Footer';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            items: []
         }
    }
    componentDidMount(){
        axios.get('/latestProducts/')
        .then(res => {
            // console.log(res.data)
            this.setState({
                items: res.data
            })
        })
        .catch()
    }
    render() { 
        const popularItems = this.state.items.map((elm, index) => {
            return <PopularItems key={index} elm={elm}/>
        })
        return ( 
            <div id='container'>
                <div id='home-landing-box'>
                    <Fade in='true' timeout={3000}>
                        <h1>Swerve Nation</h1>
                    </Fade>
                    <hr style={{"color":""}}/>
                    <Fade in='true' timeout={7000}>
                        <Link to='/products/'>
                            <Button variant="contained" color="primary" disableElevation>Shop Now</Button>
                        </Link>
                    </Fade>
                </div>
                <div id='main-quote-div'>
                    <p className="home-quote">Swerve Nation is a worldwide favorite!</p>
                </div>
                
                <Slideshow />
                <div id='home-qoute'>
                    <div className='quote-cont'>
                        <div className='home-icon-intro1' >
                        <FontAwesomeIcon style={{"color":"darkolivegreen"}} className='worldIcon' icon={faGlobeAmericas} />
                        </div>
                        <div className='home-icon-intro2'>
                            <h5>Worldwide Delivery</h5>
                            <span>We ship all over the U.S.A! All orders are processed at time of order.</span>
                        </div>
                    </div>
                    <div className='quote-cont'>
                        <div className='home-icon-intro1'>
                        <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <div className='home-icon-intro2'>
                        <h5>24/7 Customer Services</h5>
                            <span>Our dedicated support team guarantee to always support you - our beloved customer anytime of the day.</span>
                        </div>
                    </div>
                </div>
                {/* Products Items */}
                <p style={{"textAlign":"center", "fontSize":"36px", "marginBottom":"5px", "marginTop":"35px"}}>Latest Items</p>
                <hr style={{"color":"orange", "width":"20%", "border":"1px solid orange", "marginBottom":"80px"}}/>
                <div id='home-latest-items'>
                    {popularItems}
                </div>
                <Footer />
            </div>
         );
    }
}
 
export default Home;