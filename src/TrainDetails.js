import React, { Component } from 'react';
import firebase from 'firebase';
import check from './image/check-square.svg'

class TrainDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOccupied: false,
            todayDate: this.formatDate(this.props.item.stop_date_time.departure_date_time)
        }
        this.trainClick = this.trainClick.bind(this)
    }
    render() {


        return (
            <div className='trainElt' onClick={this.trainClick}>
                <p>{this.props.item.display_informations.headsign}</p>
                <p>{this.props.item.display_informations.direction}</p>
                <p>{this.formatHour(this.props.item.stop_date_time.departure_date_time)}</p>
                {this.state.isOccupied ? <img id="trainelt_occupied" src={check} alt="Logo" /> : ""}
            </div>
        );
    }
    trainClick() {
        let that = this;
        let db = firebase.firestore();
        if (this.state.isOccupied === false) {
            db.collection('train').doc(that.props.item.display_informations.headsign).set({
                date: [this.formatDate(this.props.item.stop_date_time.departure_date_time)],
                user: firebase.auth().currentUser.displayName
            })
                .then(function () {
                    that.setState({ isOccupied: true })
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        } else {

            db.collection('train').doc(that.props.item.display_informations.headsign).delete().then(function () {
                that.setState({ isOccupied: false })
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });

        }

    }
    componentDidMount() {
        let that = this
        let db = firebase.firestore();
        let docRef = db.collection('train');
        docRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (that.props.item.display_informations.headsign === doc.id && that.state.todayDate === doc.data().date.toString()) {
                    that.setState({ isOccupied: true });
                }
            }

            )
        })
    }
    formatDate(data) {
        let date = data.toString().slice(0, 8);
        return date
    }
    formatHour(data) {
        let time = data.toString().slice(-6, -2);
        let exactTime = time.slice(0, 2) + ":" + time.slice(2, 4);
        return exactTime
    }
}

export default TrainDetails;