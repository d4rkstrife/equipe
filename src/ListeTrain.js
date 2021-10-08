import React, { Component, Fragment } from 'react';
import Train from './Train';

class ListeTrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
        }
        this.buttonClick = this.buttonClick.bind(this)
    }

    render() {
        let index = Math.floor(Math.random() * 100000);
        if (this.state.showDetails !== false) {
            return (
                <Fragment>
                    <button className="pink_button" onClick={this.buttonClick}>Cacher</button>
                    <div className="liste_trains">

                        <Train key={index} data={this.props.data} />
                    </div>
                </Fragment>

            );
        } else {
            return (
                <button className="pink_button" onClick={this.buttonClick}>Prochains départs</button>
            )
        }


    }
    buttonClick() {
        if (this.state.showDetails === false) {
            this.setState({ showDetails: true })
        } else {
            this.setState({ showDetails: false })
        }
    }

}

export default ListeTrain;
