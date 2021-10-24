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
                <div className="col-md-12">
                    <div id="accordion" className="accordion-wrapper mb-3">
                        <div className="card">
                            {
                                items.map((item, index) =>
                                    <Gare key={index} data={item.data()} id={item.id} />
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default ListeGare