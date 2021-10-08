import React, { Component, Fragment } from 'react';

class FormConsult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            data: props.data.data().data,
            user: props.data.data().user,
            type: props.type
        }
        this.showDetails = this.showDetails.bind(this);
    }

    render() {
        if (this.state.type === "date") {
            return (
                <div onClick={this.showDetails} className="rapport-details">
                    <p>{this.state.data.numeroTrain}</p>
                    {this.state.showDetails ? (
                        <Fragment>
                            <div>
                                <p>Date : </p>
                                <p>{this.state.data.date}</p>
                            </div>
                            <div className="info-form">
                                <p>Agent :</p>
                                <p>{this.state.user}</p>
                            </div>
                            <div className="info-form">
                                <p>Clients controlés:</p>
                                <p>{this.state.data.nombreClient}</p>
                            </div>
                            <div className="detail-controle">
                                {this.state.data.sbControle !== "" ? (<div className="detail-controle-elt">
                                    <p>SB controle</p>
                                    <p>{this.state.data.sbControle}</p>
                                </div>) : ("")}

                                {this.state.data.sbBord !== "" ? (<div className="detail-controle-elt">
                                    <p>SB bord</p>
                                    <p>{this.state.data.sbBord}</p>
                                </div>) : ("")}
                                {this.state.data.sbPv !== "" ? (<div className="detail-controle-elt">
                                    <p>SB PV</p>
                                    <p>{this.state.data.sbPv}</p>
                                </div>) : ("")}
                                {this.state.data.nbrBnc !== "" ? (<div className="detail-controle-elt">
                                    <p>Nbr BNC</p>
                                    <p>{this.state.data.nbrBnc}</p>
                                </div>) : ("")}
                                {this.state.data.total !== "" ? (<div className="detail-controle-elt">
                                    <p>Montant total</p>
                                    <p>{this.state.data.total}€</p>
                                </div>) : ("")}
                            </div>
                            {this.state.data.commentaires !== "" ? (<div className="detail-controle-com">
                                <p>Commentaires</p>
                                <p>{this.state.data.commentaires}</p>
                            </div>) : ("")}
                        </Fragment>
                    ) : ("")}
                </div>

            );
        } else {
            return (
                <div onClick={this.showDetails} className="rapport-details">
                    <p>{this.state.data.date}</p>
                    {this.state.showDetails ? (
                        <Fragment>
                            <div>
                                <p>N° Train: </p>
                                <p>{this.state.data.numeroTrain}</p>
                            </div>
                            <div className="info-form">
                                <p>Agent :</p>
                                <p>{this.state.user}</p>
                            </div>
                            <div className="info-form">
                                <p>Clients controlés:</p>
                                <p>{this.state.data.nombreClient}</p>
                            </div>
                            <div className="detail-controle">
                                {this.state.data.sbControle !== "" ? (<div className="detail-controle-elt">
                                    <p>SB controle</p>
                                    <p>{this.state.data.sbControle}</p>
                                </div>) : ("")}

                                {this.state.data.sbBord !== "" ? (<div className="detail-controle-elt">
                                    <p>SB bord</p>
                                    <p>{this.state.data.sbBord}</p>
                                </div>) : ("")}
                                {this.state.data.sbPv !== "" ? (<div className="detail-controle-elt">
                                    <p>SB PV</p>
                                    <p>{this.state.data.sbPv}</p>
                                </div>) : ("")}
                                {this.state.data.nbrBnc !== "" ? (<div className="detail-controle-elt">
                                    <p>Nbr BNC</p>
                                    <p>{this.state.data.nbrBnc}</p>
                                </div>) : ("")}
                                {this.state.data.total !== "" ? (<div className="detail-controle-elt">
                                    <p>Montant total</p>
                                    <p>{this.state.data.total}€</p>
                                </div>) : ("")}
                            </div>
                            {this.state.data.commentaires !== "" ? (<div className="detail-controle-com">
                                <p>Commentaires</p>
                                <p>{this.state.data.commentaires}</p>
                            </div>) : ("")}
                        </Fragment>
                    ) : ("")}
                </div>
            )
        }

    }
    showDetails() {
        if (this.state.showDetails) {
            this.setState({ showDetails: false })
        } else {
            this.setState({ showDetails: true })
        }
    }
}

export default FormConsult;