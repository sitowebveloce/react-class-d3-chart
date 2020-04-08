import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default class Table extends Component {

    // ─── STATE ──────────────────────────────────────────────────────────────────────
    constructor(props){
        super(props)
        this.state = {
            name: '',
            height:'',
            age:'',
            msgList:[
                {m:'Hello'}
            ],
        }
        
    }    

     // ─── HANDLE REMOVE ──────────────────────────────────────────────────────────────
    
    handleRemove = (name)=>{
        // console.log(name)
        // FILTER DATA
       let newData = this.props.data.filter( d => {
            return ( d.name !== name)
        })
        // Update the state using method passed with the props
        this.props.updateData(newData)
    }
   
    // ─── HANDLE SUBMIT ──────────────────────────────────────────────────────────────
     handleSubmit = async () =>{
        // Reset message list array
        await this.setState({msgList: []})
        
        // this.state.msgList.map(m=>console.log(m))
        // Validator
        // console.log(typeof this.state.name)

        if(this.state.name.length === 0){
             this.setState({msgList: [{m:' Name is required '}]})
            return 
        }

        if(this.state.name.length > 20){
            this.setState({msgList: [{m:' Name too long '}]})
           return 
       }

          if(this.state.height.length === 0){
          this.setState({msgList: [...this.state.msgList, {m:' Height is required '}]})  
          return 
        }
        // if(typeof +this.state.height !== 'number'){
        //     this.setState({msgList: [...this.state.msgList, {m:' Height must be a number -'}]})  
        //     return 
        //    }
          if(this.state.age.length === 0){
            this.setState({msgList: [...this.state.msgList, {m:' Age is required '}]})  
            return
        }

        // UPDATE DATA
         this.props.updateData([...this.props.data, {name: this.state.name, height: this.state.height, age:this.state.age}]);
         // Reset form fields
         this.setState({
             name:'',
             height:'',
             age:''
         })
    }

    //
    // ─── RENDER ROW METHOD ──────────────────────────────────────────────────────────
    renderRow(){
        return(
            this.props.data.map((s,indx) => { 
                // console.log(this.props.active)
                // console.log(s.name)
                let backColor = s.name === this.props.active ? '#f4c2f3' : '#ffffff';
                return (
            
            <Row key={indx} style={{margin:'6px auto', padding:'6px auto', background:backColor}}>
            <Col xs={3}>{s.name}</Col>
            <Col xs={3}>{s.height}</Col>
            <Col xs={3}>{s.age}</Col>
            <Col xs={3}>
                <button variant={'light'} 
                className='deleteBtn'
                type={'button'}
                name={s.name}
                style={{width: 'auto'}}
                onClick={()=>this.handleRemove(s.name)}
                > <span role='img' aria-label='trash'>🗑️</span> </button>
            </Col>
            </Row>
            )})
        )
    }

    //
    // ─── RENDER ─────────────────────────────────────────────────────────────────────
    
    render() {
        return (
            <div style={{margin:'6px auto', padding:'6px auto'}}>
                <Row mt={5}>
                <Col xs={3}>
                    <Form.Control 
                    placeholder={'Name'}
                    name={'name'}
                    value={this.state.name}
                    onChange={ e => this.setState({[e.target.name]:e.target.value})}
                    type="text"
                    />
                </Col>
                <Col xs={3}>
                    <Form.Control 
                    placeholder={'Height'}
                    name={'height'}
                    value={this.state.height}
                    onChange={e => this.setState({[e.target.name]:e.target.value})}
                    type="number"
                    pattern="[0-9]*"
                    />
                </Col>
                <Col xs={3}>
                    <Form.Control 
                    placeholder={'Age'}
                    name={'age'}
                    value={this.state.age}
                    onChange={e => this.setState({[e.target.name]:e.target.value})}
                    type="number"
                    pattern="[0-9]*"
                    />
                </Col>
                <Col xs={3}>
                    <button
                    className='addBtn'
                    type={'submit'}
                    style={{width:'auto' }}
                    onClick={this.handleSubmit}
                    > 
                    <span role='img' aria-label='add'> ➕ </span>
                    </button>
                </Col>
                </Row>
        <div className="messages">
            {this.state.msgList.map(m => m.m)}
            </div>
                <div>
                {this.renderRow()}
                </div>                
            </div>
        )
    }
}
