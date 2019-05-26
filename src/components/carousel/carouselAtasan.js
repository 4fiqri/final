import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { urlApi } from '../../support/urlApi'
import Axios from 'axios';

class Gallery extends React.Component {
    state = {listProduct : []}

    componentDidMount(){
    
        this.getDataProduct()
    }
    getDataProduct = () => {
        Axios.get(urlApi + '/products')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err) => console.log(err))
    }



  onSlideChange(e) {
    console.log('Item`s position during a change: ', e.item);
    console.log('Slide`s position during a change: ', e.slide);
  }

  onSlideChanged(e) {
    console.log('Item`s position after changes: ', e.item);
    console.log('Slide`s position after changes: ', e.slide);
  }



  renderProdukJsx = () => {
    var jsx = this.state.listProduct.map((val) => {
        // if(val.nama.toLowerCase().startsWith(this.props.search.toLowerCase())){ // Transfer dari Parent Ke Child
        return (
         <div className='ml-1 mr-1'><img src={val.img} alt='tops' style={{borderRadius:'20px', width:'200px'}} /></div>            
        )
    //  }
    })

    return jsx
  }





  render() {
    const responsive = {
      0: {
        items: 1
      },
      624: {
        items: 2
      },
      824: {
        items: 3
      },
      924: {
        items: 4
      },
      1024: {
        items: 5
      }
    };

    return (
      <AliceCarousel
        duration={400}
        autoPlay={true}
        startIndex = {1}
        fadeOutAnimation={true}
        mouseDragEnabled={true}
        responsive={responsive}
        autoPlayInterval={2000}
        autoPlayDirection="rtl"
        onSlideChange={this.onSlideChange}
        onSlideChanged={this.onSlideChanged}
      >
        {this.renderProdukJsx()}
      </AliceCarousel>
    );
  }
}

export default Gallery;