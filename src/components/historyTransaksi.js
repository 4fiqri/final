import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
import {connect  } from 'react-redux'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import { TableHead } from '@material-ui/core';
import { cartCount} from './../1.actions'
import PageNotFound from './pageNotFound';
import Popup from 'reactjs-popup'



// function formatMoney(number) {
//     return number.toLocaleString('in-RP', { style: 'currency', currency: 'IDR' });
// }

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    edit : -1,
    historyDetail : [],
    isDetail : false,
    confirmBayar : false,
    verifikasi : false,
    selectedFile : null,
    error :''
  };
  componentDidMount(){
      this.getData()
  }

  getData = () => {
    Axios.get(urlApi + '/history?idUser=' + this.props.id)
    .then((res) => {
        this.setState({rows : res.data})
    })
    .catch((err) => console.log(err))
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  onBtnDetail = (item) => {

  }
  renderHistoryDetail = () => {
    var jsx = this.state.historyDetail.map((row,index) => {
      return(
        <TableRow key={index}>
          <TableCell align="center">{index+1}</TableCell>
          <TableCell align="center">{row.namaProduk}</TableCell>
          <TableCell align="center">{row.size}</TableCell>
          <TableCell align="center">{row.harga}</TableCell>
          <TableCell align="center">{row.discount} </TableCell>
          <TableCell align="center">{row.qty}</TableCell>
          <TableCell align="center">{row.qty * (row.harga - (row.harga* row.discount/100))}</TableCell>

        </TableRow>
      )
    })
    return jsx
  }

  renderErrorMessege = () => {
    if(this.props.error !== ""){
        return <div class="alert alert-danger mt-3" role="alert">
                    {this.props.error}
                </div>
    }
}

  confirmBayar = () => {
    var nomorPesanan = this.refs.nomorPesanan.value
    var tanggalTrf = this.refs.nomorPesanan.value
    var pengirim = this.refs.pengirim.value
    var danaKirim = this.refs.danaKirim.value
    var rekBrutalists = this.refs.rekBrutalists.value
    var inputResi = this.refs.inputResi.value

    if( nomorPesanan === '' || tanggalTrf === '' || pengirim === '' || danaKirim === '' || rekBrutalists === '' || inputResi === '' ){
     this.setState({error:'Harus isi semua'})
    }
    this.setState({verifikasi:true})

  }

  onChangeHandler = (event) => {
    // UNTUK MENDAPATKAN FILE IMAGE
     this.setState({selectedFile : event.target.files[0]}) 
  }

  valueHandler =() => {
    var value = this.state.selectedFile ? this.state.selectedFile.name : 'Pick A Picture'
    return value
  }

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    if(this.props.username){
    return (
        <div className='container' style={{marginTop:'70px'}}>
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                <div>* Klik tombol "Bayar" pada kolom ACT dan isi dan kirim Form Pembayaran pada Kami, pembayaran anda akan diverivikasi oleh Amdin kami.</div>
                <div>* Jika Verifikasi Pembayaran anda Berhasil barang akan segera dikirim, jika Belum berhasil segera Isi ulang Form.</div>
                <div>* Jika ada kendala hubungi CS Kami di 085234567890 (WA only).</div>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>NO</TableCell>
                            <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>TANGGAL</TableCell>
                            <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>NO PESANAN</TableCell>
                            <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>ITEM</TableCell>
                            <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>TOTAL</TableCell>
                            <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>Pembayaran</TableCell>
                            <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>ACT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
                        <TableRow key={row.id}>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.tanggal}</TableCell>
                        <TableCell align="center"> {this.props.id}{row.tanggal}{row.id} </TableCell> {/*idUser/tanggal/No.Histori(indexHistoriUser+1)*/}
                        <TableCell align="center">{row.item.length}</TableCell>
                        <TableCell align="center">{row.totalPrice} </TableCell>
                        <TableCell align="center">
                          {this.state.confirmBayar ?
                            <i className="txt border-bottom" style={{color : "#09e839", fontWeight : "bolder", fontSize : '16px'}}>Dibayar</i>
                            : this.state.verifikasi === true ?
                            <i className="txt border-bottom" style={{color : "#969696", fontWeight : "bolder", fontSize : '16px'}}>Verifikasi Admin</i>
                            :
                            <i className="txt border-bottom" style={{color : "#FD0000", fontWeight : "bolder", fontSize : '16px'}}>Belum</i>
                          }
                          
                        </TableCell>
                        <TableCell align="center">
                          {
                          this.state.confirmBayar || this.state.verifikasi === true 
                          ?
                          <input type='button' value='Detail' onClick={()=>this.setState({isDetail:true,historyDetail:row.item})} className='btn btn-danger'/>
                          :
                          <React.Fragment>
                          
                          <Popup
                            trigger={<input type='button' value='Bayar' style={{marginRight:'5px'}} className='btn btn-primary'/>}
                            modal
                            closeOnDocumentClick
                          >
                            
                          <fieldset>
                            <div className='row border-bottom align-items-center' >
                                <div className="col-sm-3" style={{fontWeight:'bolder', fontSize:'20px', color: '#FD0000'}}>
                                  <center><div ><img src={require("./../support/img/Brutalist_Logo1.png")} alt="brand" width="100px" /><br/>Brutalists.co.id</div></center>
                                </div>
                                <div className="col-sm-9" >
                                  <p>
                                    Rekening Brutalis.co.id, selain rekening di bawah ini bukan rekening kami : <br/>
                                      <b style={{fontWeight:'bolder', fontSize:'12px', color: '#0069D9'}}>
                                        - Bank Mandiri cabang Kota Bandung 123-000-0000-321, a.n. Brutalist.co.id<br/>
                                      - Bank BRI Cabang Kota Bandung 234-000-0000-432, a.n. Brutalist.co.id<br/>
                                      - Bank BNI Cabang Kota Bandung 345-000-0000-543, a.n. Brutalist.co.id<br/>
                                      - Bank BCA Cabang Kota Bandung 456-000-0000-654, a.n. Brutalist.co.id</b><br/>
                                    Setelah berhasil, Isi Form di bawah ini dan upload bukti pembayarannya.

                                    Trimakasih telah berbelanja di tempat kami.<br/><br/>

                                    Best Regards<br/>
                                    <b style={{fontWeight:'bolder', fontSize:'12px', color: '#FD0000'}}>-= Brutalists.co.id =-</b>     
                                  </p>                      
                                </div>
                            </div>
                            <div className='formPembayaran'>
                              <center>
                                <div className="col-sm-13">
                                  <h3 style={{marginTop :'0', marginBottom:'0'}} >Form Pembayaran </h3>
                                  <div className="form-group row" style={{marginTop:'0', marginBottom:'0'}}>
                                        <div className="col-sm-6"  >
                                          <label className="col-sm-12 col-form-label" style={{fontWeight:'bolder', fontSize:'12px', color: '#0069D9'}}>Nomor Pesanan</label>
                                          <div className="col-sm-12">
                                          <input type="text" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000", fontSize:'24px'}} ref='nomorPesanan' className="form-control" id="inputNoPesanan" value={this.props.id+row.tanggal+row.id} required autoFocus/>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <label className="col-sm-12 col-form-label" style={{fontWeight:'bolder', fontSize:'12px', color: '#0069D9'}}>Tanggal Transfer</label>
                                          <div className="col-sm-12">
                                          <input type="date" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000", fontSize:'12px'}} ref="tanggalTrf" className="form-control" id="inputTglTrf" required autoFocus/>
                                          </div>
                                        </div>
                                  </div>
                                    <div className="form-group row" style={{marginTop:'0', marginBottom:'0'}}>
                                        <label className="col-sm-12 col-form-label" style={{fontWeight:'bolder', fontSize:'12px', color: '#0069D9'}}>Nama Pengirim</label>
                                        <div className="col-sm-12">
                                        <input type="text" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000", fontSize:'12px'}} ref="pengirim" className="form-control" id="inputNamaPengirim" placeholder="Nama Pengirim pada bukti transaksi" required autoFocus/>
                                        </div>
                                    </div>

                                    <div className="form-group row" style={{marginTop:'0', marginBottom:'0'}}>
                                        <label className="col-sm-12 col-form-label" style={{fontWeight:'bolder', fontSize:'12px', color: '#0069D9'}}>Jumlah Dana Pengiriman</label>
                                        <div className="col-sm-12">
                                        <input type="number" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000", fontSize:'12px'}} ref="danaKirim" className="form-control" id="inputJumlahDana" value={row.totalPrice} onKeyPress={this.renderOnKeyPress} required />
                                        </div>
                                    </div>
                                    <div className="form-group row" style={{marginTop:'0', marginBottom:'10'}}>
                                        <label className="col-sm-12 col-form-label" style={{fontWeight:'bolder', fontSize:'12px', color: '#0069D9'}}>Dikirim ke Rek. Bank Brutalists</label>
                                        <div className="col-sm-12">
                                        <input type="text" style={{backgroundColor : "rgba(255, 255, 255, 0.5)", color : "#FD0000", fontSize:'12px'}} ref="rekBrutalists" className="form-control" id="inputRekBrutalists" placeholder="Mandiri / BRI / BNI / BCA" onKeyPress={this.renderOnKeyPress} required />
                                        </div>
                                    </div>
                                    <div className="form-group row" style={{marginTop:'0', marginBottom:'10'}}>                                    
                                      <div className='col-md-8'>
                                        <input style={{display :'none'}} ref='inputResi' id='inputResi' type='file' onChange={this.onChangeHandler}/>
                                        <input className='form-control btn-success' onClick={() => this.refs.input.click()} type='button' value={this.valueHandler()}/>            
                                      </div>
                                      <div className='col-md-2'>
                                      < input type='button' value='Kirim' onClick={()=>this.confirmBayar(index)} style={{marginRight:'5px'}} className='btn btn-primary'/>
                                      </div>
                                      <div className='col-md-2'>
                                        {this.renderErrorMessege()}
                                      </div>
                                    </div>
                                </div>
                              </center>
                            </div> 
                            <div>* Setelah anda mengirimkan Form ini, Status Pembayaran anda akan di Verifikasi oleh Admin kami</div>
                          </fieldset>
                          </Popup>

                          <input type='button' value='Detail' st onClick={()=>this.setState({isDetail:true,historyDetail:row.item})} className='btn btn-danger'/>
                          </React.Fragment>
                          }
                          
                        </TableCell>

                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            native: true,
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsWrapped}
                        />
                    </TableRow>
                    </TableFooter>
                </Table>
                </div>
            </Paper>
            { this.state.isDetail ? <Paper className='mt-3'>
              <Table>
                <TableHead>
                <TableRow>
                    <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>NO</TableCell>
                    <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>NAMA</TableCell>
                    <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>Size</TableCell>
                    <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>HARGA</TableCell>
                    <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>DISC</TableCell>
                    <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>QTY</TableCell>
                    <TableCell align="center" style={{fontSize:'19px', fontWeight:'500'}}>TOTAL</TableCell>
                </TableRow>                
                </TableHead>
                <TableBody>
                        {this.renderHistoryDetail()}

                </TableBody>
                <TableFooter>
                        <TableRow>
                          <TableCell> <input type='button' className='btn btn-primary' value='close' onClick={()=> this.setState({isDetail:false, historyDetail:[]})} /> </TableCell>
                        </TableRow>
                </TableFooter>      
              </Table>
            </Paper> : null}
        </div>
    );
  } return <PageNotFound />
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        username : state.user.username,
        cart : state.cart.count
    }
}

export default connect(mapStateToProps,{cartCount})(withStyles(styles)(CustomPaginationActionsTable));