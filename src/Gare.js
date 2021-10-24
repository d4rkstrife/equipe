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
        //  if (this.state.isShown === true) {
        return (
            <Fragment>
                <div class="app-main">

                    <div class="col-md-6">
                        <div id="accordion" class="accordion-wrapper mb-3">
                            <div id="headingOne" className="card-header">
                                <button type="button" data-toggle="collapse" data-target={"#collapseOne1" + this.props.id} aria-expanded="false" aria-controls="collapseOne" className="text-left m-0 p-0 btn btn-link btn-block">
                                    <h5 className="m-0 p-0">{this.props.data.nom}</h5>
                                    <p> mis à jour par: {this.props.data.user}</p>
                                </button>
                            </div>
                            <div data-parent="#accordion" id={"collapseOne1" + this.props.id} aria-labelledby="headingOne" className="collapse">
                                <div className="card-body">{
                                    equipement.map((item) =>
                                        <EquipementGare key={item} data={item} id={this.props.id} />
                                    )
                                }
                                </div>
                                <ListeTrain key={this.props.data.code} data={this.props.data.code} />
                            </div>


                        </div>
                    </div>
                </div>

            </Fragment>
        )


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