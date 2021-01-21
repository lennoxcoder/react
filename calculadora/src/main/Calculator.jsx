import React, { Component } from 'react';
import './Calculator.css';
import Display from '../components/Display';
import Button from '../components/Button';

const initialState = {

    displayValue: '0',
    clearDisplay: false,
    operation: null,
    previousValue: 0    
}

export default class Calculator extends Component {
    
    state = { ... initialState}

    clearMemory() {
        this.setState({...initialState})
    }



    setOperation(operation) {
        this.setState({clearDisplay:true})
        var currentOperation = this.state.operation
        var previousValue = this.state.previousValue
        var displayValue = this.state.displayValue
        
        // Tecla igual apertada denovo
        if(currentOperation==='=') return

        // Se já houve operacao e agora o igual foi apertado
        if(currentOperation && operation==='=') {
            var value = eval(`${previousValue} ${currentOperation} ${displayValue}` )
            displayValue = value.toString();
            this.setState({displayValue})
        } else {
            this.setState({operation})
        }

        

    }



    addDigit(n) {
        
        if(n==='.' && this.state.displayValue.includes('.')) return
        if(n==='0' && this.state.displayValue==='0') return

        // Storage
        if(this.state.clearDisplay) {
            const previousValue = parseFloat(this.state.displayValue)
            this.setState({previousValue})

        }    

        
        var value = ''
        // Se o display estiver para ser limpo ou o conteudo seja zero
        if(this.state.clearDisplay || this.state.displayValue==='0') {
            value = n
        } else {
            // Digito concatenado
            value = this.state.displayValue + n
        }
        
        // Change display from state
        const displayValue = value
        this.setState({displayValue, clearDisplay:false})

        
    }

    render() {

        const addDigit = n => this.addDigit(n)
        const setOperation = operation => this.setOperation(operation)

        return (

            <div className="calculator">

                <Display value={this.state.displayValue}/>   
                <Button label='AC' click={() => this.clearMemory()} triple/>   
                <Button label='/' click={setOperation} operation/>   
                <Button label='7' click={addDigit}/>   
                <Button label='8'click={addDigit}/>   
                <Button label='9'click={addDigit}/>   
                <Button label='*'click={setOperation} operation/>   
                <Button label='4'click={addDigit}/>   
                <Button label='5'click={addDigit}/>   
                <Button label='6'click={addDigit}/>   
                <Button label='-'click={setOperation} operation/>   
                <Button label='1'click={addDigit}/>   
                <Button label='2'click={addDigit}/>   
                <Button label='3'click={addDigit}/>   
                <Button label='+'click={setOperation} operation/>   
                <Button label='0'click={addDigit} double/>   
                <Button label='.'click={addDigit}/>      
                <Button label='='click={setOperation} operation/>   
                
            </div>

        )

    }

}
