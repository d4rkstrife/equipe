import React from 'react';
import * as firebase from "firebase";
import Gare from './Gare'

class ListeGare extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }


    componentDidMount() {
        const db = firebase.firestore();
        let that = this
        db.collection("gare").orderBy("ordre")

            .onSnapshot(function (querySnapshot) {
                that.setState({
                    isLoaded: true,
                    items: querySnapshot.docs
                });
            })
    }
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {

            return (
                <div>
                    <table>
                        <thead>
                            <td>Gare</td>
                            <td>Dernière Contribution</td>
                        </thead>
                        {
                            items.map((item, index) =>
                                <Gare key={index} data={item.data()} id={item.id} />
                            )
                        }
                    </table>
                </div>
            )
        }
    }
}
export default ListeGare