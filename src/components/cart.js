
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import PageNotFound from './pageNotFound'
import Popup from 'reactjs-popup'


import React from "react"
import axios from 'axios'
// import {Link} from 'react-router-dom';
import { urlApi } from "./../support/urlApi"
import { Button , Icon, Header,Segment } from 'semantic-ui-react'
import swal from 'sweetalert'
import { cartCount, resetCount} from './../1.actions'


function formatMoney(number) {
    return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
}

class Cart extends React.Component{
    state = {cart:[]}

    componentDidMount(){
        this.getDataCart()
    }

    getDataCart = () => {
        axios.get(urlApi + '/cart', {params : {idUser : this.props.userId}})
        .then((res) => this.setState({cart : res.data}))
        .catch((err) => console.log(err))
    }
   
    
    min = (param) =>{
        var newData = {
            userId : param.userId,
            username : param.username,
            id : param.id,
            idProduct : param.idProduct,
            img : param.img,
            namaProduk : param.namaProduk,
            size :param.size,
            harga : param.harga,
            discount : param.discount,
            qty : param.qty-1,
        }
        
        if(param.qty >1){
        axios.put(urlApi + '/cart/' + newData.id , newData)
        .then((res) => {this.getDataCart()})
        .catch((err) => {console.log(err)})
        }
    }

    plus = (param) => {
        var newData = {
            userId : param.userId,
            username : param.username,
            id : param.id,
            idProduct : param.idProduct,
            img : param.img,
            namaProduk : param.namaProduk,
            size :param.size,
            harga : param.harga,
            discount : param.discount,
            qty : param.qty+1,
        }

        axios.put(urlApi + '/cart/' + newData.id , newData)
        .then((res) => {this.getDataCart()})
        .catch((err) => {console.log(err)})
    }

   
    onBtnRemoveCart(id){
        axios.delete(urlApi +'/cart/'+ id)
        .then((res) => {
            this.getDataCart()
            this.props.cartCount(this.props.username)
            this.handleConfirm()
          })
          .catch((err) => console.log(err))
    }

    renderCartProdukjsx = () => {
        var jsx = this.state.cart.map((val,index) => {
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
                    <div className="col-10 mx-auto col-lg-1 ">
                        <strong>
                            <span className="d-lg-none">price :</span>{formatMoney(val.harga-(val.harga*val.discount/100))}
                        </strong>
                    </div>
                    <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0 ">
                        <div className="d-flex justify-content-center">
                            <div>
                            {/* <input disabled className='btn border-secondary col-md-2' value='Add to WishList' /> */}
                            Qty :
                                <span
                                    className="btn btn-black border-danger mx-1"
                                    onClick={()=>this.min(val)}
                                >
                                    -
                                </span>
                                <span className="btn btn-black border-dark mx-1">{val.qty}</span>
                                <span
                                    className="btn btn-black border-primary mx-1"
                                    onClick={() => {this.plus(val)}}
                                >
                                    +
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 mx-auto col-lg-1 ">
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
                                            onClick={() => { this.onBtnRemoveCart(val.id) 
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
                    <div className="col-10 mx-auto col-lg-2 ">
                        <strong>{formatMoney((val.harga-(val.harga*val.discount/100))*val.qty)} </strong>
                    </div>
                </div>
                </React.Fragment>
            )
        })
    return jsx
    }

    emptyCart = () => {
            return (
                <center>
                <div className='container'>
                  <Segment>
                    <Header as='h2' floated=''>
                    Your cart is currently empty !!!
                    </Header>
                    <Link to = '/product'><Button inverted color='green'>
                        Continue Shoping
                    </Button></Link>
                    
                  </Segment>
                </div>
                </center>
            );
    }

    clearAllCart = () => {
        for(var i=0;i<this.state.cart.length; i++){
            axios.delete(urlApi +'/cart/' + this.state.cart[i].id)
            .then((res) => {
                swal('Clear All Cart' , 'Clear All Cart Success' , 'success');
                this.getDataCart()
                this.props.cartCount(this.props.username)
                         
            })
            .catch((err) => console.log(err))
        }
        
    }

    totalBayar = () => {
        var bayar = 0
        for(var i = 0; i < this.state.cart.length; i++ ){
            bayar += ((this.state.cart[i].harga-(this.state.cart[i].harga*this.state.cart[i].discount/100))*this.state.cart[i].qty)
        }
        return bayar
    }

    totalPembayaran = () => {
        return(
            <div className="container-fluid text-right d-none d-lg-block">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">                    
                        <Popup trigger={<input className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button"
                            value ='clear All cart'/>} modal  closeOnDocumentClick >
                            {close => (
                                <React.Fragment>
                                <div className="header" style={{marginTop:'10px', textAlign:'center'}}> Yakin akan menghapus semua Cart ? </div>
                                <div className="content" style={{textAlign:'center'}}>
                                    <button style={{marginRight:'10px', marginTop:'20px', marginBottom:'10px', textAlign:'center'}} className="btn btn-light btn-outline-dark"
                                        onClick={() => { this.clearAllCart() 
                                        close() }} > Yes </button>
                                    <button style={{marginLeft:'10px', marginTop:'20px', marginBottom:'10px', textAlign:'center'}} className="btn btn-light btn-outline-dark"
                                        onClick={() => { console.log('modal closed ') 
                                        close() }}> Cancel </button>
                                </div>
                                </React.Fragment>
                            )}
                        </Popup>           
                        <h5>
                            <span className="text-title"> Total Pembayaran : Rp.{this.totalBayar()}</span>{" "}
                            <span></span>
                        </h5>
                        <div className=" cart-icon">
                            <Popup trigger={ <Button animated color='green'>
                                <Button.Content visible>Bayar</Button.Content>
                                <Button.Content hidden><Icon name='money bill alternate outline'/></Button.Content>
                                </Button>} modal  closeOnDocumentClick >
                                {close => (
                                    <React.Fragment>
                                    <div className="header" style={{marginTop:'10px', textAlign:'center'}}> Lanjutkan Pembayaran ? </div>
                                    <div className="content" style={{textAlign:'center'}}>
                                        <button style={{marginRight:'10px', marginTop:'20px', marginBottom:'10px', textAlign:'center'}} className="btn btn-light btn-outline-dark"
                                            onClick={() => { this.onBtnCheckout() 
                                            close() }} > Yes </button>
                                        <button style={{marginLeft:'10px', marginTop:'20px', marginBottom:'10px', textAlign:'center'}} className="btn btn-light btn-outline-dark"
                                            onClick={() => { console.log('modal closed ') 
                                            close() }}> Cancel </button>
                                    </div>
                                    </React.Fragment>
                                )}
                            </Popup>
                            <Button animated color='green' onClick={this.onBtnCheckout}>
                                <Button.Content visible>CheckOut</Button.Content>
                                <Button.Content hidden>
                                <Icon name='money bill alternate outline'/>
                                </Button.Content>
                            </Button>
                            {/* money bill alternate outline */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onBtnCheckout = () => {
        var date = new Date()
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
            if(month <= 9) month = '0'+month;
        var day= date.getDate();
            if(day <= 9) day = '0'+day;
        var today = day + month + year
        var totalPrice = this.totalBayar()
        var newData = {
            idUser : this.props.userId,
            tanggal : today,
            item : this.state.cart,
            totalPrice : totalPrice
        }
        axios.post(urlApi +'/history', newData)
        .then((res) =>{
            console.log(res)
            this.props.cartCount(this.props.username)
            swal('Segera Lakukan Pembayaran' , 'Rekening brutalists ada pada tombol Bayar dikolom ACT di Menu => History Transaksi' , 'success')

        })
        .catch((err) => console.log(err))
        
        for(var i=0;i<this.state.cart.length; i++){
            axios.delete(urlApi +'/cart/' + this.state.cart[i].id)
            .then((res) => {
                this.setState({cart :[]})
                this.props.cartCount(this.props.username)

            })
            .catch((err) => console.log(err))
        }
       
    }

   
          
    render(){ 
        if(this.state.cart.length === 0 && this.props.userId > 0){
            return(
                <div className="container-fluid text-center d-none d-lg-block" style={{marginTop:'70px'}}>
                    {this.emptyCart()}
                </div>
            )
        }
        if(this.props.userId > 0){
            return(
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
                        <div className="col-10 mx-auto col-lg-1">
                            <p className="text-uppercase">Price</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">quantity</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-1">
                            <p className="text-uppercase">remove</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">Total Price</p>
                        </div>
                    </div>
                    {this.renderCartProdukjsx()}
                    {this.totalPembayaran()}

                </div>

                // <div>
                // <table className="table">
                //     <thead className="thead-dark">
                //         <tr>
                //             <th scope="col">#</th>
                //             <th scope="col" style={{width:'200px'}}>Image Of Products</th>
                //             <th scope="col">Name Of Products</th>
                //             <th scope="col">Price</th>
                //             <th style={{width:'20px'}}/>
                //             <th scope="col">Quantity</th>
                //             <th style={{width:'20px'}} />
                //             <th scope="col">Remove</th>
                //             <th scope="col">Total Price</th>
                //         </tr>
                //     </thead>
                //     {this.renderCartProdukjsx()}
                //     <tfoot>
                //         <tr>
                //             <td colspan="7" style={{textAlign : "right"}}>Total Pembayaran =</td>
                //             <td>{this.totalBayar()}</td>
                //         </tr>
                //     </tfoot>
                // </table>
                // </div>
            )
        }return <PageNotFound/>
    }

}

const mapStateToProps = (state) => {
    return{
        username : state.user.username,
        userId : state.user.id
    }
}


export default connect(mapStateToProps,{cartCount,resetCount})(Cart)