import React from 'react'
import Carousel from './carousel/carousel'
import CarouselA from './carousel/carouselAtasan'
import CarouselB from './carousel/carouselBawahan'
import { connect } from 'react-redux'
import Product from './productList'

class Home extends React.Component{
    state = {search : ''}
    onBtnClick = () => {
        this.setState({search :this.refs.searchBook.value})
    }

    render(){
        return(
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-3 mt-4">
                        <div className="card p-2 mb-2">
                            <form ref="formFilter" style={{boxShadow:"none", fontSize:"14px"}}>
                                <center>
                                <h3>Get it easy with your hand</h3>
                                <div>
                                    <img src={require("./../support/img/play_store.png")} alt="brand" width="115px" height ='40px'/> {/*Brutalists.co.id</img>*/}
                                    <img src={require("./../support/img/appstore.png")} alt="brand" width="115px" height ='40px' /> {/*Brutalists.co.id</img>*/}
                                </div>
                                </center>
                            </form>
                        </div> 
                        <div className="card p-2">
                            <form ref="formFilter" style={{boxShadow:"none", fontSize:"14px"}}>
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary  mb-1">Cari Produk</div>
                                <input ref='namaSearch' className="form-control form-control-sm mb-2" placeholder="Nama Produk"></input>
                                
                                <div className="form-label col-sm-6 text-left font-weight-bold pl-1 text-secondary mb-1">Pilih Category</div>
                                <input className=" form control form-control-sm mb-2" placeholder="Category"></input>

                                <button className="btn btn-info"><i class="fas fa-search"></i> Search</button>                               
                            </form>
                        </div>
                        
                    </div>
                
                    <div className="col-lg-9">
                        <div className="my-4">
                            <Carousel />
                        </div>
                        {/* {this.props.id} */}
                    </div>
                </div>
                <div className="border mb-3 ml-0" style={{padding:"20px", borderRadius:"20px", backgroundColor : "rgb(249, 249, 249, 0.5)"}} >
                    <h2>NEW TOPS ARRIVAL</h2>
                    <h6></h6>
                    <CarouselA/>
                </div>
                <div className="border mb-3 ml-0" style={{padding:"20px", borderRadius:"20px", backgroundColor : "rgb(249, 249, 249, 0.5)"}} >
                    <h2>NEW BOTTOMS ARRIVAL</h2>
                    <h6></h6>
                    <CarouselB/>
                </div>
                <Product search={this.state.search}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        id : state.user.id
    }
}

export default connect(mapStateToProps)(Home)