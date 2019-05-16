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
            if(this.props.bebas === "")
            {
                return(
                    <div style={{marginBottom:"0px"}}>
                        <Navbar color="light" light expand="md" fixed="top" style={{opacity : '0.75'}}>
                            <NavbarBrand className="ml-2" style={{fontSize:"18px"}}><Link to='/'><img src={require("./../support/img/Brutalist_Logo.png")} alt="brand" width="30px" /> Brutalists.co.id</Link> </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                    <div className="input-group border-right" style={{width:"350px"}}>
                                        <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... " />
                                        <div className="input-group-append mr-2">
                                            <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                                        </div>
                                    </div> 
                                    </NavItem>
                                    
                                    <NavItem>
                                        <Link to="/register"><NavLink style={{fontSize:"18px"}}><i className="fas fa-user-plus" /> Daftar</NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/login"><NavLink style={{fontSize:"18px"}}><i className="fas fa-sign-in-alt" /> Masuk </NavLink></Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                );
            } else {
                return(
                    <div style={{marginBottom:"75px"}}>
                        <Navbar color="light" light expand="md" fixed="top" style={{opacity : '0.75'}}>
                        <NavbarBrand className="ml-2" style={{fontSize:"18px"}}><Link to='/'><img src={require("./../support/img/Brutalist_Logo.png")} alt="brand" width="30px" /> Brutalists.co.id</Link> </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                    <div className="input-group border-right" style={{width:"350px"}}>
                                        <input type="text" ref="searchBook" className="form-control" placeholder="Masukkan kata kunci ... " />
                                        <div className="input-group-append mr-2">
                                            <button className="btn border-secondary" type="button" id="button-addon2"><i className="fas fa-search" /></button>
                                        </div>
                                    </div> 
                                    </NavItem>
                                    
                                    <NavItem>
                                        <NavLink>Hi , {this.props.bebas}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        {this.props.cart  === 0 ?
                                            <Link to="/cart"><NavLink className="btn btn-default" style={{fontSize:"14px"}}><i class="fas fa-shopping-cart"></i> Cart</NavLink></Link>
                                             :
                                             <Link to="/cart"><NavLink className="btn btn-default" style={{fontSize:"14px"}}><Badge badgeContent={this.props.cart} className='badgeCart' variant="outlined" color="primary"><i class="fas fa-shopping-cart"></i> Cart </Badge></NavLink></Link>
                                        }
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                        Menu
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                        {
                                            this.props.role === 'admin' 
                                            ? 
                                           <Link to='/manage'> 
                                                <DropdownItem>
                                                    Manage Product
                                                </DropdownItem> 
                                            </Link>
                                            :
                                            null
                                        }
                                        <Link to='history'> <DropdownItem>
                                            Histori Transaksi
                                        </DropdownItem></Link>
                                        <DropdownItem>
                                            Edit Profile 
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={this.onBtnLogout}>
                                            Log Out
                                        </DropdownItem>
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
        bebas : state.user.username,
        role : state.user.role,
        cart : state.cart.count
    }
}



export default connect(mapStateToProps,{resetUser,resetCount})(HeaderKu);