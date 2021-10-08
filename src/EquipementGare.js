import React from 'react';
import firebase from 'firebase'

class EquipementGare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: this.props.data[0],
            etat: this.props.data[1]
        }
        this.updateFirebase = this.updateFirebase.bind(this);
    }


    render() {
        if (this.state.nom !== "nom" && this.state.nom !== "code" && this.state.nom !== "ordre" && this.state.nom !== "user") {
            return (
                <div className="equipement_container">
                    <button onClick={this.updateFirebase} className={this.state.etat + " etat_button"} >{this.state.nom}</button>

                </div>

            )
        } else {
            return null
        }

    }
    updateFirebase() {
        let db = firebase.firestore();
        let document = db.collection('gare').doc(this.props.id);
        if (this.state.etat === "Ok") {
            document.update({
                [this.state.nom]: "En panne"
            })
        } else {
            document.update({
                [this.state.nom]: "Ok"
            })
        }
        document.update({
            user: firebase.auth().currentUser.displayName
        })
    }
}

export default EquipementGare;

