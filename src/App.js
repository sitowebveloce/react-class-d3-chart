import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import {json} from 'd3';
import './App.css';
import Table from './Table';
// import {ReactComponent as Svg} from './load.svg'
import Footer from './Footer';

import ChartWrapper from './ChartWrapper';

class App extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      active:null
    }
    
  }
// Fake array
  dataArr =[
  {
    name:'Tony',
    height:'152',
    age:'10'
  },
  {
    name:'Jessica',
    height:'148',
    age:'12'
  },
  {
    name:'Andrew',
    height:'135',
    age:'9'
  },
  {
    name:'Emuly',
    height:'145',
    age:'10'
  },
  {
    name:'Richard',
    height:'141',
    age:'13'
  }

]

  // Fetch data
  componentDidMount(){
    // let url ='https://udemy-react-d3.firebaseio.com/children.json';
    // json(url) YOU CAN USE json(url) d3 method to fetch data from url
    this.setState({data:this.dataArr})
    
  }

  // ─── UPDATE ACTIVE NAME ─────────────────────────────────────────────────────────
  activeName = (name)=>{
    this.setState({active: name})
  }

  // Render chart function
  renderChart(){
    if(this.state.data.length === 0){
      // Reload data array
      this.setState({data:this.dataArr})
      return
      // return (
      //   <div className='loader'>
      //   <Svg className='gear-svg' />
      //   </div>
      // )
    }
    // Return component
    // console.log(this.state.data)
    return <ChartWrapper data={this.state.data} updateName={this.activeName}/>
  }

  // ─── UPDATE DATA METHOD ─────────────────────────────────────────────────────────
    updateData = (data) =>{
      this.setState({data:data})
  } 

  // ─── RENDER ─────────────────────────────────────────────────────────────────────

  render() {
    return (
      <div className='app'>
        <Navbar bg="dark">
          <Navbar.Brand className='chart-nav-title'>D3 Chart</Navbar.Brand>
        </Navbar>
        <Container>
      <div className='text-center m-auto'><a href="/catalog" className='m-auto'> <span role='img' aria-label='home'>🏠</span></a></div>         
          <h1 className='title text-center mt-5 mb-5'>Age and Height Chart</h1>
          <Row>
          <Col lg={6} md={12} xs={12}> {this.renderChart()} </Col>
          <Col lg={6} md={12} xs={12}> <Table data={this.state.data} updateData={this.updateData} active={this.state.active} /></Col>
          </Row>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default App;
