import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { urlApi } from './../support/urlApi'
import './../support/css/product.css'
import Axios from 'axios';
import swal from 'sweetalert';
import { cartCount } from './../1.actions'
import { connect} from 'react-redux'

class ProductList extends React.Component{
    state = {listProduct : []}

    componentDidMount(){
    
        this.getDataProduct()
    }
    getDataProduct = () => {
        axios.get(urlApi + '/products')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err) => console.log(err))
    }
    addProduct = (obj) => {
        var newData = {
            username : this.props.username,
            userId : this.props.id,
            discount : obj.discount,
            img : obj.img,
            namaProduk : obj.nama,
            harga : obj.harga,
            qty : 1,
        }
        Axios.get(urlApi + '/cart?namaProduk=' + newData.namaProduk + '&idUser=' + this.props.id).then((res) => {
            if(res.data.length > 0){
                Axios.put(urlApi + '/cart/' + res.data[0].id , {...newData , qty : parseInt(res.data[0].qty) + newData.qty})
                swal('Update Product' , 'Suksees' , 'success')
            }else{
                Axios.post(urlApi + '/cart' , newData)
                .then((res) => {
                    swal('Add Product' , 'Suksees' , 'success')
                    this.props.cartCount(this.props.username)
                })
            }
        })
    }
    renderProdukJsx = () => {
        var jsx = this.state.listProduct.map((val) => {
            // if(val.nama.toLowerCase().startsWith(this.props.search.toLowerCase())){ // Transfer dari Parent Ke Child
            return (
                <div className="card col-md-2 mr-3 ml-4 mt-3" style={{width: '100%'}} >
                    <Link to={'/product-detail/' + val.id}><img className="card-img-top img" height='150px' src={val.img} alt="Card" /></Link>
                    
                    {/* { Pake if ternary (karena melakukan pengkondisian di dalam return)} */}


                    {   
                        val.discount > 0 ?
                        <div className='discount'>{val.discount}%</div>
                        : null
                    }
                    <div className="card-body">
                    <h4 className="card-text">{val.nama}</h4>

                    {
                        val.discount > 0 ?
                        <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {val.harga}</p>
                        : null
                    }

                    <p style={{display:'inline' , marginLeft:'10px',fontWeight:'500'}}>Rp. {val.harga - (val.harga*(val.discount/100))}</p>
                    <input type='button' className='d-block btn btn-primary' onClick={()=> this.addProduct(val)} value='Add To Cart' />
                    </div>
                </div>
            )
        //  }
        })

        return jsx
    }
    render(){
        return(
            <div className='container'>
                <div className='row justify-content-center'>
                {this.renderProdukJsx()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
         id : state.user.id,
         username : state.user.username
    }
}

export default connect(mapStateToProps,{cartCount})(ProductList);



// var a = 3
// if(a > 0){
//     console.log('besar')
// }else if(a < 0) {
//     console.log('kecil')
// }else {
//     console.log('sedang')
// }   

// a > 0 ? console.log('besar') : a < 0 ? console.log('kecil') : console.log('sedang')