import React, { Component } from  'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }


    getStyle = () => {
        return {
            color: this.color
        };
    }

    render() {
        return (
            <div className='alert'>
                <p className={this.props.className} style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}


 export class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#5bc0de';
    }
}

export class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#e91e63';
    }
}

export class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color= '#df4759';

    }

}