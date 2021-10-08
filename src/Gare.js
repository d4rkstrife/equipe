import React, { Fragment } from 'react';
import EquipementGare from './EquipementGare';
import ListeTrain from './ListeTrain';

class Gare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
        }
        this.showDetails = this.showDetails.bind(this);
    }
    render() {
        let equipement = Object.entries(this.props.data);
        if (this.state.isShown === true) {
            return (
                <div>
                    <tr className="gare_elt">
                        <td onClick={this.showDetails}>{this.props.data.nom}</td>
                        <td>{this.props.data.user}</td>
                    </tr>
                    <div className="equipement_elt">
                        {
                            equipement.map((item) =>
                                <EquipementGare key={item} data={item} id={this.props.id} />
                            )
                        }
                    </div>
                    <ListeTrain key={this.props.data.code} data={this.props.data.code} />
                </div>
            )
        } else {
            return (
                <tr className="gare_elt" onClick={this.showDetails}>
                    <td>{this.props.data.nom}</td>

                    <td>{this.props.data.user}</td>
                </tr>
            )
        }

    }
    showDetails() {
        if (this.state.isShown === true) {
            this.setState({ isShown: false })
        } else {
            this.setState({ isShown: true })
        }

    }
}
export default Gare