import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateTotal} from '../../Redux/reducer';
// import {getCartTotal} from '../../Redux/reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome, faTshirt, faEnvelope, faAddressCard, faBars, faTimes, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {  faInstagram, faTwitter  } from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            mobileOpen: false
         }
    this.close = this.close.bind(this);
    }
    close(){
        this.setState({
            mobileOpen: false
        })
    }
    render() { 
        return ( 
            <header id='header'>
                <div id='ex'>
                <div className='cart-logo'>
                    <Link style={{"color":"white"}} to='/cart/'>
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </Link>
                    <span style={{"position":"absolute", "fontSize":"15px", "left":"39px", }}>{this.props.cartItems}</span>
                </div>
                <div id='icon-cont'>
                    <Link to='/'>
                        {/* <img style={{"width":"100%"}} src={Logo} alt='swerve-nation-logo' /> */}
                        <span>Logo</span>
                    </Link>
                </div>
                <div id='nav-links'>
                    <Link to='/'>
                        <FontAwesomeIcon icon={faHome} /> <br />
                        <span>Home</span>
                    </Link>
                    <Link to='/products/'>
                        <FontAwesomeIcon icon={faTshirt} /> <br />
                        <span>Products</span>
                    </Link>
                    <Link to='/about/'>
                        <FontAwesomeIcon icon={faAddressCard} /> <br />
                        <span>About Us</span>
                    </Link>
                    <Link to='/contact/'>
                        <FontAwesomeIcon icon={faEnvelope} /> <br />
                        <span>Contact</span>
                    </Link>
                </div>
                <div id='mobile-menu'>
                    <FontAwesomeIcon onClick={() => this.setState({mobileOpen: !this.state.mobileOpen}) } icon={this.state.mobileOpen ? faTimes : faBars} />
                </div>
                <div id='social-icons'>
                    <Link to='#'>
                        <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                    <a href='#'>
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>

                </div>
                <div id={this.state.mobileOpen ? 'nav-links-2-open':'nav-links-2-closed'}>
                    <Link to='/' onClick={this.close}>
                        <FontAwesomeIcon icon={faHome} />
                    </Link>
                    <Link to='/products/' onClick={this.close}>
                        <FontAwesomeIcon icon={faTshirt} />
                    </Link>
                    <Link to='/about/' onClick={this.close}>
                        <FontAwesomeIcon icon={faAddressCard} />
                    </Link>
                    <Link to='/contact/' onClick={this.close}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </Link>
                </div>
            </header>
         );
    }
}
 
const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps, {updateTotal})(Header); 