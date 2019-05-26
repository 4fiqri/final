import React, { Component } from 'react';
import { connect } from 'react-redux'
import Axios from 'axios';
import { urlApi } from "./../support/urlApi"
import { Button , Icon, Header,Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'




function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}


class wishlist extends Component {
    state={wishlist: []}

    componentDidMount(){
        this.getDataWishlist()
    }

    getDataWishlist = () => {
        Axios.get(urlApi + '/wishlist', {params : {idUser : this.props.userId}})
        .then((res) => this.setState({wishlist : res.data}))
        .catch((err) => console.log(err))
    }

    renderWishlistProdukjsx = () => {
        var jsx = this.state.wishlist.map((val,index) => {
            return (
                <React.Fragment>
                <div className="row my-1 text-capitalize text-center">
                    <div className="col-10 mx-auto col-lg-2">
                    <Link to={'/product-detail/' + val.idProduct}>
                        <img
                            src={val.img}
                            style={{ width: "5rem", heigth: "5rem" }}
                            className="img-fluid"
                            alt=""
                        />
                    </Link>
                    </div>
                    <div className="col-10 mx-auto col-lg-3 ">
                    <span className="d-lg-none">product :</span> {val.namaProduk}
                    </div>
                    <div className="col-10 mx-auto col-lg-1 ">
                    <span className="d-lg-none">size :</span> {val.size}
                    </div>
                    <div className="col-10 mx-auto col-lg-2 ">
                        <strong>
                            <span className="d-lg-none">price :</span>{formatMoney(val.harga-(val.harga*val.discount/100))}
                        </strong>
                    </div>
                    
                    <div className="col-10 mx-auto col-lg-2 ">
                        <div>
                            <Popup trigger={<Button animated color='red'>
                                <Button.Content visible>Remove</Button.Content>
                                <Button.Content hidden><Icon name='delete'/></Button.Content>
                                </Button>} modal  closeOnDocumentClick >
                                {close => (
                                    <React.Fragment>
                                    <div className="header" style={{marginTop:'10px'}}> Yakin akan Menghapus {val.namaProduk} size {val.size} ? </div>
                                    <div className="content">
                                        <button style={{marginRight:'10px', marginTop:'20px', marginBottom:'10px'}} className="btn btn-light btn-outline-dark"
                                            onClick={() => { this.onBtnRemoveWishlist(val.id) 
                                            close() }} > Yes </button>
                                        <button style={{marginLeft:'10px', marginTop:'20px', marginBottom:'10px'}} className="btn btn-light btn-outline-dark"
                                            onClick={() => { console.log('modal closed ') 
                                            close() }}> Cancel </button>
                                    </div>
                                    </React.Fragment>
                                )}
                            </Popup>
                        </div>
                    </div>
                </div>
                </React.Fragment>
            )
        })
    return jsx
    }

    onBtnRemoveWishlist(id){
        Axios.delete(urlApi +'/wishlist/'+ id)
        .then((res) => {
            this.getDataWishlist()
          })
          .catch((err) => console.log(err))
    }

    emptyWishlist = () => {
        return (
            <center>
            <div className='container'>
              <Segment>
                <Header as='h2' floated=''>
                Your Wishlist is currently empty !!!
                </Header>
                <Link to = '/product'><Button inverted color='green'>
                    Continue Shoping
                </Button></Link>
                
              </Segment>
            </div>
            </center>
        )
    }

    render() {
        if(this.state.wishlist.length === 0 && this.props.userId > 0){
            return(
                <div className="container-fluid text-center d-none d-lg-block" style={{marginTop:'70px'}}>
                    {this.emptyWishlist()}
                </div>
            )
        }
        if(this.props.userId > 0){
            return (
                <div className="container-fluid text-center d-none d-lg-block" style={{marginTop:'70px'}}>
                        <div className="row ">
                            {/* <div className="col-10 mx-auto col-lg-2">
                                <p className="text-uppercase">#</p>
                            </div> */}
                            <div className="col-10 mx-auto col-lg-2">
                                <p className="text-uppercase">Image of Products</p>
                            </div>
                            <div className="col-10 mx-auto col-lg-3">
                                <p className="text-uppercase">Name of Product</p>
                            </div>
                            <div className="col-10 mx-auto col-lg-1">
                                <p className="text-uppercase">Size</p>
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <p className="text-uppercase">Price</p>
                            </div>
                            <div className="col-10 mx-auto col-lg-2">
                                <p className="text-uppercase">remove</p>
                            </div>
                        </div>
                        {this.renderWishlistProdukjsx()}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return{
        username : state.user.username,
        userId : state.user.id
    }
}

export default connect(mapStateToProps)(wishlist)