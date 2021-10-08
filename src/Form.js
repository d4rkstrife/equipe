import React, { Component } from 'react';
import firebase from 'firebase'

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            numeroTrain: '',
            nombreClient: '',
            sbControle: '',
            sbBord: '',
            sbPv: '',
            nbrBnc: '',
            nbrAutres: '',
            total: '',
            commentaires: ''
        }
        this.submit = this.submit.bind(this);
    }
    render() {
        return (
            <div>
                <h3>Rapport</h3>
                <form className="form-rapport" onSubmit={this.submit}
                    noValidate>
                    <div>
                        <label htmlFor="date">Date : </label>
                        <input type="date" id="date" name="date" value={this.state.date}
                            onChange={e => this.setState({ date: e.target.value })} required></input>
                    </div>
                    <div>
                        <label htmlFor="numero-train"></label>
                        <input type="number" id="numero-train" name="numero-train" value={this.state.numeroTrain} placeholder="Numéro Train"
                            onChange={e => this.setState({ numeroTrain: e.target.value })} required></input>
                    </div>
                    <div>
                        <label htmlFor="nbr-clients"></label>
                        <input type="number" id="nbr-clients" name="nbr-clients" value={this.state.nombreClient} placeholder="Personnes controlées"
                            onChange={e => this.setState({ nombreClient: e.target.value })} required></input>
                    </div>
                    <div>
                        <label htmlFor="sb-controle"></label>
                        <input type="number" id="sb-controle" name="sb-controle" value={this.state.sbControle} placeholder="Nombre SB Contrôle"
                            onChange={e => this.setState({ sbControle: e.target.value })}></input>
                    </div>
                    <div>
                        <label htmlFor="sb-bord"></label>
                        <input type="number" id="sb-bord" name="sb-bord" value={this.state.sbBord} placeholder="Nombre SB Bord"
                            onChange={e => this.setState({ sbBord: e.target.value })}></input>
                    </div>
                    <div>
                        <label htmlFor="sb-pv"></label>
                        <input type="number" id="sb-pv" name="sb-pv" value={this.state.sbPv} placeholder="Nombre SB PV"
                            onChange={e => this.setState({ sbPv: e.target.value })}></input>
                    </div>
                    <div>
                        <label htmlFor="bnc"></label>
                        <input type="number" id="bnc" name="bnc" value={this.state.nbrBnc} placeholder="Nombre BNC"
                            onChange={e => this.setState({ nbrBnc: e.target.value })}></input>
                    </div>
                    <div>
                        <label htmlFor="autres"></label>
                        <input type="number" id="autres" name="autres" value={this.state.nbrAutres} placeholder="Autres"
                            onChange={e => this.setState({ nbrAutres: e.target.value })}></input>
                    </div>
                    <div>
                        <label htmlFor="total"></label>
                        <input type="number" id="total" name="total" value={this.state.total} placeholder="Montant Total"
                            onChange={e => this.setState({ total: e.target.value })}></input>
                    </div>
                    <div>
                        <label htmlFor="commentaires"></label>
                        <textarea id="commentaires" name="commentaires" value={this.state.commentaires} placeholder="Commentaires"
                            onChange={e => this.setState({ commentaires: e.target.value })}></textarea>
                    </div>
                    <button className="pink_button" type="submit">Envoyer Rapport</button>
                    <p>{this.state.errorMessage}</p>
                </form>
            </div>
        );
    }
    submit(event) {
        event.preventDefault();
        let db = firebase.firestore();
        if (this.state.date !== '' && this.state.numeroTrain !== '' && this.state.nombreClient !== '') {
            db.collection('rapports').add({
                data: this.state,
                user: firebase.auth().currentUser.displayName
            });
            this.setState({
                date: '',
                numeroTrain: '',
                nombreClient: '',
                sbControle: '',
                sbBord: '',
                sbPv: '',
                nbrBnc: '',
                nbrAutres: '',
                total: '',
                commentaires: ''
            })
        } else {
            console.log("error")
            this.setState({ errorMessage: "Les champs date, numero train et nombre clients sont obligatoires." })
        }

    }
}

export default Form;