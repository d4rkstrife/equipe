import React, { Component, Fragment } from 'react';
import firebase from 'firebase';
import FormConsult from './FormConsult'

class FormList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: props.isAdmin,
            date: null,
            number: null
        }
        this.getRapportsByDate = this.getRapportsByDate.bind(this);
        this.getRapportsByNumber = this.getRapportsByNumber.bind(this);
        this.getRapportsByUser = this.getRapportsByUser.bind(this);
        this.resetState = this.resetState.bind(this);
    }
    render() {
        if (this.state.isAdmin) {
            if (!this.state.items) {
                return (
                    <Fragment>
                        <h3>Rechercher les rapports</h3>
                        <form onSubmit={this.getRapportsByDate}>
                            <div>
                                <label htmlFor="date">Date : </label>
                                <input type="date" id="date" name="date"
                                    onChange={e => this.setState({ date: e.target.value })} required></input>
                                <button className="pink_button" type="submit">Rapports</button>
                            </div>

                        </form>
                        <form onSubmit={this.getRapportsByNumber}>
                            <div>
                                <label htmlFor="numero">N° Train : </label>
                                <input type="number" id="number" name="number"
                                    onChange={e => this.setState({ number: e.target.value })} required></input>
                                <button className="pink_button" type="submit">Rapports</button>
                            </div>

                        </form>
                    </Fragment>

                )
            } else if (this.state.type === "date") {
                return (
                    <Fragment>
                        {
                            this.state.items.map((item, index) =>
                                <FormConsult data={item} key={index} type="date" />
                            )
                        }
                        <button className="pink_button" id="reset-button" type="submit" onClick={this.resetState}>RAZ</button>
                    </Fragment>
                )
            } else if (this.state.type === "number") {
                return (
                    <Fragment>
                        {
                            this.state.items.map((item, index) =>
                                <FormConsult data={item} key={index} type="number" />
                            )
                        }
                        <button className="pink_button" id="reset-button" type="submit" onClick={this.resetState}>RAZ</button>
                    </Fragment>
                )
            }
        } else if (this.state.items) {
            return (
                <Fragment>
                    {
                        this.state.items.map((item, index) =>
                            <FormConsult data={item} key={index} type="user" />
                        )
                    }
                </Fragment>
            )

        } else if (!this.state.items) {
            console.log(firebase.auth())
            return (

                < div >
                    <p>Accès non-autorisé</p>
                </div >
            )
        }

    }
    getRapportsByUser() {
        let db = firebase.firestore();
        db.collection('rapports').where('user', "==", firebase.auth().currentUser.displayName)
            .onSnapshot((querySnapshot) => {
                this.setState({
                    items: querySnapshot.docs,
                    type: "user"
                });
            })
    }

    getRapportsByDate(event) {
        event.preventDefault();
        let db = firebase.firestore();
        db.collection("rapports").where("data.date", "==", this.state.date)

            .onSnapshot((querySnapshot) => {
                this.setState({
                    items: querySnapshot.docs,
                    type: "date"
                });
            })
    }
    getRapportsByNumber(event) {
        event.preventDefault();
        let db = firebase.firestore();
        db.collection("rapports").where("data.numeroTrain", "==", this.state.number)

            .onSnapshot((querySnapshot) => {
                this.setState({
                    items: querySnapshot.docs,
                    type: "number"
                });
            })
    }
    resetState() {
        this.setState({ items: null, type: null, date: null, number: null })
    }
    componentDidMount() {
        if (!this.state.isAdmin) {
            this.getRapportsByUser();
        }
    }
    componentWillUnmount() {
        this.resetState();
    }
}

export default FormList;