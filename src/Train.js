import React, { Component, Fragment } from 'react';
import TrainDetails from './TrainDetails';


class Train extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
        };
    }
    render() {
        if (this.state.data === null) {
            return (
                <p>Chargement des trains</p>
            )
        } else {
            return (
                <Fragment>
                    {
                        this.state.data.departures.map((item, index) =>
                            <TrainDetails key={index} item={item} index={index} />
                        )
                    }
                </Fragment>
            )
        }

    }


    componentDidMount() {
        let d = new Date();
        let year = this.formatDate(d.getFullYear());
        let month = this.formatDate(d.getMonth() + 1);
        let day = this.formatDate(d.getDate());
        let hour = this.formatDate(d.getHours());
        let minute = this.formatDate(d.getMinutes());
        let second = this.formatDate(d.getSeconds());

        let date = `${year}${month}${day}${hour}${minute}${second}`
        fetch(`https://api.navitia.io/v1/coverage/fr-se/physical_modes/physical_mode:Tramway/stop_areas/${this.props.data}/departures?from_datetime=${date}&key=0a6f65c0-c3be-4fe3-a8e5-9aac523d5be7`)
            .then(reponse => reponse.json())
            .then(data => this.setState({ data }));
    }
    formatDate(number) {
        if (number < 10) {
            number = "0" + number.toString();
        } else {
            number = number.toString();
        }
        return number;
    }
}

export default Train;