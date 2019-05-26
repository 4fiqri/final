import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import { connect } from 'react-redux'
import { cartCount } from './../1.actions'
import { ButtonToolbar,ToggleButtonGroup,ToggleButton } from 'react-bootstrap';
import swal from 'sweetalert';
import './../support/css/productDetail.css'


class ProductDetail extends React.Component{
    state = {product : {}, ukuran:'', error:'',wishlist:[], wish : 'Add To Wishlist'}
    
    componentDidMount(){
        this.getDataApi()
    }
    
    getDataApi = () => {
        var idUrl = this.props.match.params.idProduct
        Axios.get(urlApi+'/products/' + idUrl)
        .then((res) => {
            this.setState({product : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    qtyValidation =() => {
        var qty = this.refs.inputQty.value
        if(qty < 1) {
            this.refs.inputQty.value = 1
        }
    }

    sizeProduct = (sizee) => {
        this.setState({ukuran : sizee})
        
        Axios.get(urlApi + '/wishlist?namaProduk=' + this.state.product.nama + '&size=' + this.state.ukuran + '&userId=' + this.props.id)
        .then((res) => {
            // this.setState({wishlist : res.data})
            if(res.data.length > 0){
                this.setState({wish : 'Your Wishlist'})
            }else{
                this.setState({wish : 'Add To Wishlist'})
            }
        })
        .catch((err) => console.log(err))
        this.setState({error : ''})

    }
            

    renderErrorMessege = () => {
        if(this.state.error !== ""){
            return <div align='center' class="alert alert-danger mt-3 col-md-5" role="alert">
                        {this.state.error}
                    </div>
        }
    }

    onBtnAddProduct = () => {
        var newData = {
            userId : this.props.id,
            username : this.props.username,
            idProduct : this.state.product.id,
            img : this.state.product.img,
            namaProduk : this.state.product.nama,
            size: this.state.ukuran,
            harga : this.state.product.harga,
            discount : this.state.product.discount,
            qty : parseInt(this.refs.inputQty.value),
        }
        Axios.get(urlApi + '/cart?namaProduk=' + this.state.product.nama + '&size=' + this.state.ukuran + '&idUser=' + this.props.id).then((res) => {
            if(this.state.ukuran === ""){
                this.setState({error : "Pilih Size dulu!"})
            }else if(res.data.length > 0){
                Axios.put(urlApi + '/cart/' + res.data[0].id, {...newData, qty: parseInt(res.data[0].qty) + parseInt(this.refs.inputQty.value) })
                swal('Status Add' , 'Success Update to Cart' , 'success')
                this.setState({error : ""})
            }else{
                Axios.post(urlApi + '/cart',newData)
                .then((res) => {
                    swal('Status Add' , 'Success Add to Cart' , 'success')
                    this.props.cartCount(this.props.username)
                })
                .catch((err) => console.log(err))//
            }
        })
    }

    onBtnAddWhislist = () => {
        var newData = {
            userId : this.props.id,
            username : this.props.username,
            idProduct : this.state.product.id,
            img : this.state.product.img,
            namaProduk : this.state.product.nama,
            size: this.state.ukuran,
            harga : this.state.product.harga,
            discount : this.state.product.discount,
        }        
        if(this.state.ukuran === ""){
            this.setState({error : "Pilih Size dulu!"})
        }else{
            
            Axios.get(urlApi + '/wishlist?namaProduk=' + this.state.product.nama + '&size=' + this.state.ukuran + '&userId=' + this.props.id)
            .then((res) => {
                if(res.data.length > 0){
                    Axios.delete(urlApi + '/wishlist/' + res.data[0].id)
                    .then((res) => {
                        this.setState({wish : 'Add To Wishlist'})
                        alert('Delete from Your Wishlist')})
                    .catch((err) => console.log(err))
                }else{
                    Axios.post(urlApi + '/wishlist',newData)
                    .then((res) => {
                        this.setState({wish : 'Your Wishlist'})
                        alert('Add to Your Wishlist')
                    })
                    .catch((err) => console.log(err))//
                }
            })
        }
    }

     render(){
        var {nama,img,discount,deskripsi,harga} = this.state.product
        return(
            <div className='container' style={{marginTop:'70px'}}>
                <div className='row'>
                    <div className='col-md-4'>
                    <div className="card" style={{width: '100%'}}>
                        <img className="card-img-top" src={img} alt="Card image cap" />
                        <div className="card-body">
                        </div>
                    </div>
                    </div>

                    <div className='col-md-8'>
                        <h1 style={{color:'#4C4C4C'}}>{nama}</h1>
                        <div style={{backgroundColor:'#D50000',
                                     width:"50px",
                                     height:'22px',
                                     color : 'white',
                                     textAlign:'center',
                                     display:'inline-block'}} >
                            {discount}%
                        </div>
                        <span style={{fontSize:'12px',
                                      fontWeight:'600',
                                      color:'#606060',
                                      marginLeft:'10px',
                                      textDecoration:'line-through'}}> Rp. {harga} </span>

                        <div style={{fontSize:'24px',
                                     fontWeight : '700',
                                     color:'#FF5722',
                                     marginTop:'20px'}}>Rp. {harga - (harga * (discount/100))}</div>

                        <div className='row'>
                            <div className='col-md-2'>
                                <div style={{marginTop:'15px',
                                        color:'#606060',
                                        fontWeight:'700',
                                        fontSize:'14px'}}>Jumlah</div>
                                <input type='number' onChange={this.qtyValidation} ref='inputQty' defaultValue={1} min={1} className='form-control' style={{width : '60px',marginTop:'10px'}} />
                            </div>
                            <div className='col-md-6'>
                                <div style={{marginTop:'15px',
                                            color:'#606060',
                                            fontWeight:'700',
                                            fontSize:'14px'}}>Pilih Size Yang DIinginkan :
                                </div>
                                <ButtonToolbar >
                                    <ToggleButtonGroup ref='butt' type="radio" name="options" defaultValue={""}>
                                        <ToggleButton className='TB' style={{marginTop:'9px', marginLeft:'9px'}} onClick={() => this.sizeProduct('S')} value={"S"}>S</ToggleButton>
                                        <ToggleButton className='TB' style={{marginTop:'9px', marginLeft:'9px'}} onClick={() => this.sizeProduct('M')} value={"M"}>M</ToggleButton>
                                        <ToggleButton className='TB' style={{marginTop:'9px', marginLeft:'9px'}} onClick={() => this.sizeProduct('L')} value={"L"}>L</ToggleButton>
                                        <ToggleButton className='TB' style={{marginTop:'9px', marginLeft:'9px'}} onClick={() => this.sizeProduct('XL')} value={"XL"}>XL</ToggleButton>
                                    </ToggleButtonGroup>
                                </ButtonToolbar>
                                {/* <button ref='sizeS' onClick={() => this.sizeProduct('S')} style={{marginTop:'9px', marginLeft:'9px'}} type="button" class="btn btn-dark">S</button>
                                <button ref='sizeM' onClick={() => this.sizeProduct('M')} style={{marginTop:'9px', marginLeft:'9px'}} type="button" class="btn btn-dark">M</button>
                                <button ref='sizeL' onClick={() => this.sizeProduct('L')} style={{marginTop:'9px', marginLeft:'9px'}} type="button" class="btn btn-dark">L</button>
                                <button ref='sizeXL' onClick={() => this.sizeProduct('XL')} style={{marginTop:'9px', marginLeft:'9px'}} type="button" class="btn btn-dark">XL</button> */}
                            </div>
                        </div>
                        <div className='row mt-4'>
                            <div className='col-md-8'>
                                <p style={{color:'#606060',fontStyle:'italic'}}>{deskripsi}</p>
                            </div>

                        </div>
                        {this.props.username === "" 
                        ?
                            <div className='row mt-4'>
                                <input type='button' disabled className='btn border-secondary col-md-2' value='Add To Wishlist' />
                                {/* <input type='button' disabled className='btn btn-primary col-md-3' value='Beli Sekarang' /> */}
                                <input type='button' disabled className='btn btn-success col-md-3' value='Masukan Ke Keranjang' />
                            </div>
                        :
                            <div className='row mt-4'>
                                <input type='button' className='btn border-secondary col-md-2' onClick={this.onBtnAddWhislist} value={this.state.wish} />
                                {/* <input type='button' className='btn btn-primary col-md-3' value='Beli Sekarang' /> */}
                                <input type='button' className='btn btn-success col-md-3'style={{marginLeft:'9px'}} onClick={this.onBtnAddProduct} value='Masukan Ke Keranjang' />
                            </div>
                        }
                        {this.renderErrorMessege()}                    
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        id : state.user.id,
        cart : state.cart.count
    }
}

export default connect(mapStateToProps,{cartCount})(ProductDetail);
