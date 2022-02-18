import React, { Component } from  'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
        this.width = null;
        this.fontSize = null;
        this.margin = "0.5rem auto";
    }


    getStyle = () => {
        return {
            color: this.color,
            width: this.width,
            'font-size': this.fontSize,
            margin: this.margin
        };
    }

    render() {
        return (
            <div className='Alert'>
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}


 export class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#29d2e4';
        this.width = '20rem';
        this.fontSize = '0.8rem';
    }
}

export class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#e91e63';
        this.width = '20rem';
        this.fontSize = '0.8rem';
    }
}

export class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color= '#ff9933';
        this.width = '100%';
        this.fontSize = '1.2rem';
    }

}