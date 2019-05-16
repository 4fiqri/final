import React, { Fragment } from 'react'
import { Link ,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { onLogin,cartCount } from './../1.actions'
import Loader from 'react-loader-spinner'
import cookie from 'universal-cookie'
import './../support/css/loginBackground.css'
import { grey } from '@material-ui/core/colors';


// MENYIMPAN DATA DI BROWSER
const Cookie = new cookie()
class Login extends React.Component{
    state = {register : false}
        
    // KE TRIGER KALAU ADA PERUBAHAN PROPS YAITU GLOBAL STATE
    componentWillReceiveProps(newProps){
        console.log(newProps)
        if(newProps.username !== ""){
            this.props.cartCount(newProps.username)        
        Cookie.set('userData',newProps.username,{path :'/'})}
    }
    onBtnLoginClick = () => {
        var username = this.refs.username.value // fikri
        var password = this.refs.password.value // rahasia123
        this.props.onLogin(username,password)

    }

    renderBtnOrLoading = () => {
        if(this.props.loading === true){
            return <Loader
                    type="Audio"
                    color="#00BFFF"
                    height="50"	
                    width="50"
                    />
        }else{
            return <button type="button" className="btn btn-primary" onClick={this.onBtnLoginClick} style={{width:"300px"}} ><i className="fas fa-sign-in-alt" /> Login</button>
        } 
    }

    renderLoadingOrBtn =() => {
        if(this.props.loading === true){
            return <Loader
                    type="Audio"
                    color="#00BFFF"
                    height="50"	
                    width="50"
                    />
        }else{
            return <button type="button" className="btn btn-primary col-sm-12"  onClick={this.onBtnRegisterClick} ><i className="fas fa-sign-in-alt"  /> Sign Up!</button>
        }
    }


    renderErrorMessege = () => {
        if(this.props.error !== ""){
            return <div class="alert alert-danger mt-3" role="alert">
                        {this.props.error}
                    </div>
        }
    }

    onBtnFormRegister = () =>{
    this.setState({register : true})
    
    }


    render(){
        if(this.props.username !== ""){
            return <Redirect to='/'/>
        }
        return(
            <div className='login-background'>
                <div className="row justify-content-sm-center ml-auto mr-auto mt-3 col-md-6" >
                    <form className="border mb-3 ml-0" style={{padding:"20px", borderRadius:"20px", width : "600px", backgroundColor : "rgba(255, 255, 255, 0.5)"}} ref="formLogin">
                        <fieldset>
                            <div className='row'>
                                <div className="col" style={{fontWeight:'bolder', fontSize:'20px', color: '#FD0000'}}>
                                    <center><div ><img src={require("./../support/img/Brutalist_Logo1.png")} alt="brand" width="200px" /><br/>Brutalists.co.id</div></center>
                                </div>
                                <div className="col">
                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" style={{fontWeight:'bolder', fontSize:'18px', color: '#0069D9'}}>Username</label>
                                        <div className="col-sm-12">
                                        <input type="text" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000"}} ref="username" className="form-control" id="inputEmail" placeholder="Input Your Username" required autoFocus/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-6 col-form-label" style={{fontWeight:'bolder', fontSize:'18px', color: '#0069D9'}}>Password</label>
                                        <div className="col-sm-12">
                                        <input type="password" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000"}} ref="password" className="form-control" id="inputPassword" placeholder="Input Your Password" onKeyPress={this.renderOnKeyPress} required />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group row">
                                        <div className="col-sm-12" style={{textAlign:'center'}}>
                                            {this.renderBtnOrLoading()}
                                            <div> <button className='btn border-primary mt-2' onClick={this.loginWithGoogle} style={{width:"300px"}} > Login With Google</button> </div>
                                            {this.renderErrorMessege()}
                                        </div>
                                    </div>
                                    <div className="col"><h6>Don't have Account? <i className="btn my-auto border-bottom" onClick={this.onBtnFormRegister} style={{ fontSize : "18px", color : "#0069D9", fontWeight : "bolder"}}>Register Now!</i></h6></div>
                                </div>
                            </div> 
                        </fieldset>
                    </form>
                </div>

                {/* ============================================= REGISTER ===================================================================*/}
                <div className="row justify-content-sm-center ml-auto mr-auto mt-3 col-md-6">
                {this.state.register == true ?
                                    <div className='register-background'>
                                    {/* <div className="row justify-content-sm-center ml-auto mr-auto mt-3 col-md-6" >
                                    
                                    </div> */}
                                    
                                    <div className="row justify-content-sm-center ml-auto mr-auto mt-3 col-md-12">
                                        <form className="border mb-3" style={{padding:"20px", borderRadius:"20px", width : "600px", backgroundColor : "rgba(255, 255, 255, 0.5)"}} ref="formRegister">
                                            <fieldset>    
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" style={{fontWeight:'bolder', color: '#0069D9'}}>Username</label>
                                                    <div className="col-sm-8">
                                                    <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" required autoFocus/>
                                                    </div>
                                                </div>
                        
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" style={{fontWeight:'bolder', color: '#0069D9'}}>Password</label>
                                                    <div className="col-sm-8">
                                                    <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" required />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" style={{fontWeight:'bolder', color: '#0069D9'}}>Confirm Password</label>
                                                    <div className="col-sm-8">
                                                    <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" required />
                                                    </div>
                                                </div>
                        
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" style={{fontWeight:'bolder', color: '#0069D9'}}>Email</label>
                                                    <div className="col-sm-8">
                                                    <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email@mail.com" required />
                                                    </div>
                                                </div>
                        
                                                <div className="form-group row">
                                                    <label className="col-sm-4 col-form-label" style={{fontWeight:'bolder', color: '#0069D9'}}>Phone</label>
                                                    <div className="col-sm-8">
                                                    <input type="phone" ref="phone" className="form-control" id="inputPhone" placeholder="Ex: 08xxxxxxxxxx" required />
                                                    </div>
                                                </div>
                                                
                                                <div className="form-group row">
                                                    <div className="col-sm-12" style={{textAlign:'center'}}>
                                                    {this.renderLoadingOrBtn()}
                                                    <div> <button className='btn border-primary mt-2 col-sm-12' onClick={this.loginWithGoogle}  > Login With Google</button> </div>
                                                    {this.renderErrorMessege()}
                                                    </div>
                                                        
                                                </div>
                                                <div className="col"><h6>Already have Account? <i className="btn my-auto border-bottom" style={{ fontSize : "18px", color : "#0069D9", fontWeight : "bolder"}}>Login Now!</i></h6></div>
                                                        
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                                : null

                }    
                </div>                                   
            </div>
        )
        
    }
}
const mapsStateToProps =(state) => {
    return{
        username : state.user.username,
        loading : state.user.loading,
        error : state.user.error,
    }
}


export default connect(mapsStateToProps,{ onLogin,cartCount })(Login)