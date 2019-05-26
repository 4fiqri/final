import React,  { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Badge from '@material-ui/core/Badge';
import terserah from 'universal-cookie'
import { resetUser,resetCount } from './../1.actions'


const objCookie = new terserah()
class HeaderKu extends Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
      };
    }
    toggle() {
       this.setState({
         isOpen: !this.state.isOpen
       });
    }

    onBtnLogout = () => {
        objCookie.remove('userData')
        this.props.resetUser()
        this.props.resetCount()
    }

    render(){
            if(this.props.userName === "")
            {
                return(
                    <div style={{marginBottom:"0px"}}>
                        <Navbar color="light" light expand="md" fixed="top" style={{opacity : '0.75'}}>
                            <NavbarBrand className="ml-2" style={{fontSize:"18px"}}><Link to='/'><img src={require("./../support/img/Brutalist_Logo.png")} alt="brand" width="30px" /> Brutalists.co.id</Link> </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Link to="/login"><NavLink style={{fontSize:"18px"}}><i className="fas fa-user-plus" /> Daftar / Masuk <i className="fas fa-sign-in-alt" /> </NavLink></Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                );
            } else {
                return(
                    <div style={{marginBottom:"0px"}}>
                        <Navbar color="light" light expand="md" fixed="top" style={{opacity : '0.75'}}>
                        <NavbarBrand className="ml-2" style={{fontSize:"18px"}}><Link to='/'><img src={require("./../support/img/Brutalist_Logo.png")} alt="brand" width="30px" /> Brutalists.co.id</Link> </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    
                                    <NavItem>
                                        <NavLink>Hi , {this.props.userName}</NavLink>
                                    </NavItem>
                                    {   
                                        this.props.role === 'user'
                                        ?
                                        <NavItem>
                                            {this.props.cart  === 0 ?
                                                <Link to="/cart"><NavLink className="btn btn-default" style={{fontSize:"14px"}}><i class="fas fa-shopping-cart"></i> Cart</NavLink></Link>
                                                    :
                                                <Link to="/cart"><NavLink className="btn btn-default" style={{fontSize:"14px"}}><Badge badgeContent={this.props.cart} className='badgeCart' variant="outlined" color="primary"><i class="fas fa-shopping-cart"></i> Cart </Badge></NavLink></Link>
                                            }
                                        </NavItem>
                                        :
                                        null
                                    }
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                        Menu
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                        {
                                            this.props.role === 'admin' 
                                            ? 
                                            <React.Fragment>
                                            <Link to='/manage'> 
                                                <DropdownItem>
                                                    Manage Product
                                                </DropdownItem> 
                                            </Link>
                                            <Link to='/manageTransaksi'> 
                                                <DropdownItem>
                                                    Manage Transaksi
                                                </DropdownItem> 
                                            </Link>
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                            <Link to='/history'>
                                                <DropdownItem>
                                                    Histori Transaksi
                                                </DropdownItem>
                                            </Link>
                                            <Link to='/wishlist'>
                                                <DropdownItem>
                                                    Wishlist
                                                </DropdownItem>
                                            </Link>
                                            <Link to='/editProfile'>
                                                <DropdownItem>
                                                    Edit Profile
                                                </DropdownItem>
                                            </Link>
                                            </React.Fragment>
                                        }
                                        <DropdownItem divider />
                                        <Link to='/'>
                                        <DropdownItem onClick={this.onBtnLogout}>
                                            Log Out
                                        </DropdownItem>
                                        </Link>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                );
            }
            
        }
}

const mapStateToProps = (state) => {
    return {
        userName : state.user.username,
        role : state.user.role,
        cart : state.cart.count
    }
}



export default connect(mapStateToProps,{resetUser,resetCount})(HeaderKu);