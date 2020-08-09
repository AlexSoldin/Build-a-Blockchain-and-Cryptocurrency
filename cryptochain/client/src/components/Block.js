import React, { Component } from 'react'

class Block extends Component {
    render(){
        const { timestamp, hash, data } = this.props.block;
        const hashDisplay = `${hash.substring(0, 15)}...`;
        
        const stringData = JSON.stringify(data);
        const dataDisplay = stringData.length > 15 ? `${stringData.substring(0, 15)}...` : stringData;

        return (
            <div className="Block">
                <div>Hash: {hashDisplay}</div>
                <div>Timestamp: {new Date(timestamp).toLocaleDateString()}</div>
                <div>Data: {dataDisplay}</div>
            </div>
        );
    }
}

export default Block;