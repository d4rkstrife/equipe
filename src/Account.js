import React from 'react';
import firebase from 'firebase';

class Account extends React.Component {
    render() {
        console.log(firebase.auth().currentUser.displayName)
        return <div>
            <div className="mb-3 row">
                <label for="staticEmail" className="col-sm-2 col-form-label">Email :</label>
                <div className="col-sm-6">
                    <input type="text" readonly className="form-control-plaintext" id="staticEmail" value={firebase.auth().currentUser.email} />
                </div>
            </div>
            <div className="mb-3 row">
                <label for="staticName" className="col-sm-2 col-form-label">Nom :</label>
                <div className="col-sm-6">
                    <input type="text" readonly className="form-control-plaintext" id="staticName" value={firebase.auth().currentUser.displayName} />
                </div>
            </div>
        </div>;
    }
}

export default Account;