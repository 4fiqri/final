import React, { Component } from 'react'
import { urlApi } from "./../support/urlApi"
import Axios from 'axios';

export default class editProfile extends Component {

    getDataUser = () => {
        Axios.get(urlApi + '/users')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err) => console.log(err))
    }


    render() {
        return (
            <div className='login-background'>
                <div className="row ml-auto mr-auto mt-3 col-md-6" style={{fontSize:"25px", color: '#FE0000'}} >
                    <div >
                    <p style={{marginTop:10,marginBottom:10}}>Data Anda saat ini :</p>
                    <p style={{color : "#0069D8", fontSize: '16px', marginTop:0,marginBottom:0}}>Username</p>
                    <p style={{color : "#FD0000", fontSize: '16px', marginTop:0,marginBottom:0}}>Username</p>
                    <p style={{color : "#0069D8", fontSize: '16px', marginTop:0,marginBottom:0}}>Nama Lengkap</p>
                    <p style={{color : "#FD0000", fontSize: '16px', marginTop:0,marginBottom:0}}>Nama Lengkap</p>
                    <p style={{color : "#0069D8", fontSize: '16px', marginTop:0,marginBottom:0}}>Alamat</p>
                    <p style={{color : "#FD0000", fontSize: '16px', marginTop:0,marginBottom:0}}>Alamat</p>
                    <p style={{color : "#0069D8", fontSize: '16px', marginTop:0,marginBottom:0}}>Email</p>
                    <p style={{color : "#FD0000", fontSize: '16px', marginTop:0,marginBottom:0}}>Email</p>
                    <p style={{color : "#0069D8", fontSize: '16px', marginTop:0,marginBottom:0}}>Mobile Phone</p>
                    <p style={{color : "#FD0000", fontSize: '16px', marginTop:0,marginBottom:0}}>Mobile Phone</p>
                    </div>
                    <div className="row justify-content-sm-center"  style={{marginTop:20,marginBottom:0}}>

                    <p>Lengkapi Data Diri Anda</p>
                    <p>Agar Memudahkan Verifikasi dan Pengiriman</p>
                    <p>---======================================---</p>
                    <p>-= Brutalists.co.id =-</p>

                    </div>
                    
                    
                    
                    
                </div>
                <div className="row justify-content-sm-center ml-auto mr-auto mt-3 col-md-6">
                    <div className='register-background'>
                        {/* <div className="row justify-content-sm-center ml-auto mr-auto mt-3 col-md-6" >
                        
                        </div> */}
                        
                        <div className="row justify-content-sm-center ml-auto mr-auto mt-3 col-md-12">
                            <form className="border mb-3" style={{padding:"20px", borderRadius:"20px", width : "600px", backgroundColor : "rgba(255, 255, 255, 0.5)"}} ref="formRegister">
                                <fieldset>    
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label" style={{fontWeight:'bolder', color: '#0069D9'}}>Username</label>
                                        <div className="col-sm-8 " style={{color : "#FD0000", fontSize: '28px'}}>
                                            User Name
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label" style={{fontWeight:'bolder', color: '#0069D9'}}>Nama Lengkap</label>
                                        <div className="col-sm-8">
                                        <input type="text" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000"}} ref='namaLengkap' className="form-control" id="inputUsername" placeholder="Nama Lengkap" required autoFocus/>
                                        </div>
                                    </div>            
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label" style={{fontWeight:'bolder', color: '#0069D9'}}>Alamat</label>
                                        <div className="col-sm-8">
                                        <input type="text" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000"}} ref='alamat' className="form-control" id="inputUsername" placeholder="Alamat" required autoFocus/>
                                        </div>
                                    </div>               
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label" style={{fontWeight:'bolder', color: '#0069D9'}}>Email</label>
                                        <div className="col-sm-8">
                                        <input type="email" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000"}} ref="email" className="form-control" id="inputEmail" placeholder="Email@mail.com" required />
                                        </div>
                                    </div>
            
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label" style={{fontWeight:'bolder', color: '#0069D9'}}>Phone</label>
                                        <div className="col-sm-8">
                                        <input type="phone" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000"}} ref="phone" className="form-control" id="inputPhone" placeholder="Ex: 08xxxxxxxxxx" required />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <div className="col-sm-12" style={{textAlign:'center'}}>
                                            <input type='button' className='btn btn-primary mt-2' style={{width:"300px"}} value='Save Data' />
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
            
        )
    }
}
