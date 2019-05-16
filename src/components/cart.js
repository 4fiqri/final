import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import PageNotFound from './pageNotFound'





import React from "react"
import axios from 'axios'
// import {Link} from 'react-router-dom';
import { urlApi } from "./../support/urlApi"
import { Button , Icon, Divider, Header, Image, Segment } from 'semantic-ui-react'
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
            username : param.username,
            userId : param.userId,
            namaProduk : param.namaProduk,
            harga : param.harga,
            qty : param.qty-1,
            img : param.img,
            id : param.id,
            discount : param.discount
        }
        
        if(param.qty >1){
        axios.put(urlApi + '/cart/' + newData.id , newData)
        .then((res) => {this.getDataCart()})
        .catch((err) => {console.log(err)})
        }
    }

    plus = (param) => {
        var newData = {
            username : param.username,
            userId : param.userId,
            namaProduk : param.namaProduk,
            harga : param.harga,
            qty : param.qty+1,
            img : param.img,
            id : param.id,
            discount : param.discount
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
          })
          .catch((err) => console.log(err))
    }

    renderCartProdukjsx = () => {
        var jsx = this.state.cart.map((val,index) => {
            return (
                <React.Fragment>
                <div className="row my-1 text-capitalize text-center">
                    <div className="col-10 mx-auto col-lg-2">
                    <img
                        src={val.img}
                        style={{ width: "5rem", heigth: "5rem" }}
                        className="img-fluid"
                        alt=""
                    />
                    </div>
                    <div className="col-10 mx-auto col-lg-2 ">
                    <span className="d-lg-none">product :</span> {val.namaProduk}
                    </div>
                    <div className="col-10 mx-auto col-lg-2 ">
                    <strong>
                        <span className="d-lg-none">price :</span>Rp. {val.harga-(val.harga*val.discount/100)}
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
                    <div className="col-10 mx-auto col-lg-2 ">
                    <div className=" cart-icon">
                            <Button animated color='red' onClick={() => {this.onBtnRemoveCart(val.id)}}>
                                <Button.Content visible>Remove</Button.Content>
                                <Button.Content hidden>
                                <Icon name='delete'/>
                                </Button.Content>
                            </Button>
                    </div>
                    </div>

                    <div className="col-10 mx-auto col-lg-2 ">
                    <strong>item total : Rp. {(val.harga-(val.harga*val.discount/100))*val.qty} </strong>
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
                
                
            //   <div className="container mt-5">
            //     <div className="row">
            //       <div className="col-10 mx-auto text-center text-title text-capitalize">
            //         <h1>Your cart is currently empty !!!</h1>
            //       </div>
            //     </div>
            //   </div>
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
                        <input className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button"
                            onClick={this.clearAllCart} value ='clear All cart'
                        />
                        <h5>
                        <span className="text-title"> Total Pembayaran : Rp.{this.totalBayar()}</span>{" "}
                        <span></span>
                        </h5>
                        <div className=" cart-icon">
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
        var today = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
        var totalPrice = this.totalBayar()
        var newData = {
            idUser : this.props.userId,
            tanggal : today,
            item : this.state.cart,
            totalPrice : totalPrice
        }
        axios.post(urlApi +'/history', newData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        
        for(var i=0;i<this.state.cart.length; i++){
            axios.delete(urlApi +'/cart/' + this.state.cart[i].id)
            .then((res) => {
                this.setState({cart :[]})
            })
            .catch((err) => console.log(err))
        }
       
    }
          
    render(){ 
        if(this.state.cart.length == 0 && this.props.userId > 0){
            return(
                this.emptyCart()
            )
        }
        if(this.props.userId > 0){
            return(
                <div className="container-fluid text-center d-none d-lg-block">
                    <div className="row ">
                        {/* <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">#</p>
                        </div> */}
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">Image of Products</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">Name of Product</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">Price</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
                            <p className="text-uppercase">quantity</p>
                        </div>
                        <div className="col-10 mx-auto col-lg-2">
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