import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

var urlMaterialService = 'http://localhost:3010/1001/'

class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierID: '',
            supplierName: '',
            supplierNearestSeaPort: '',
            supplierNearestAirport: '',
            supplierSeaFreightTransitTime: '',
            supplierAirFreightTransitTime: '',
            supplierWebsite: '',
            supplierLinkCatalouges: '',
            fields: {}
        };
        this.onMaterialClick = this.onMaterialClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    loadDropdown = (endPointUrl) => {
        fetch(endPointUrl)
            .then(res => res.json())
            .then((data) => {

                var arrOptions = [];
                for (var k = 0; k < data.length; k++) {
                    arrOptions.push(<tr key={k}>
                    <td>{data[k].ItemName}</td>
                    <td>{data[k].ItemType}</td>
                    <td>{data[k].ItemOrigin}</td>
                    <td>{data[k].HS_HsCode}</td>
                    <td>{data[k].CargoType}</td>
                    </tr>);
                    break;
                }
                this.setState({ supplierListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(urlMaterialService + 'supplier')

    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    handleChange(evt) {
        // check it out: we get the evt.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [evt.target.name]: evt.target.value });
    }

    onMaterialClick(fields) {
        console.error(fields);
        alert('1--SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
        var mtID = null;
        var METHOD = 'POST'
        if (fields.materialID !== 'NEW_SUPPLIER') {
            METHOD = 'PUT';
            mtID = fields.materialID;
        }
        fetch(urlMaterialService + 'supplier', {
            method: METHOD,
            body: JSON.stringify({
                
                ID: fields.supplierID,
                Name: fields.supplierName,
                NearestSeaPort:  fields.supplierNearestSeaPort,
                NearestAirport:  fields.supplierNearestAirport,
                SeaFreightTransitTime:  fields.supplierSeaFreightTransitTime,
                AirFreightTransitTime:  fields.supplierAirFreightTransitTime,
                Website:  fields.supplierWebsite,
                LinkCatalouges:  fields.supplierLinkCatalouges
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('Supplier is success fully saved');
            } else {
                alert('An error occurred while saving please try again');
            }
            return response.json()
        }).then(json => {
            this.setState({
                user: json
            });
        });
    }

    render() {
        return (
            <div className="row pl-5 pt-3">
                <div className="col-11 form-box mt-2 mb-4">
                    <div className="float-right">
                        <button type="button" onClick={this.openModal} className="btn btn-line-primary-bridge " data-toggle="modal" data-target=".bd-example-modal-lg" >Add</button>
                    </div>
                </div>
                <div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                   
                        contentLabel="Example Modal">
                        <Formik
                            initialValues={{
                
                                supplierID: '',
                                supplierName: '',
                                supplierNearestSeaPort: '',
                                supplierNearestAirport: '',
                                supplierSeaFreightTransitTime: 0,
                                supplierAirFreightTransitTime: 0,
                                supplierWebsite: '',
                                supplierLinkCatalouges: '',
                            }}
                            validationSchema={Yup.object().shape({
                                supplierID: Yup.string()
                                    .min(6, 'Material name must be at least 6 characters')
                                    .required('Material name is required'),
                                supplierName: Yup.string()
                                    .required('Please select the material type.'),
                                supplierNearestSeaPort: Yup.string()
                                    .required('Please select the country of origin'),
                                supplierNearestAirport: Yup.string()
                                    .required('Please select the unit of measure'),
                                supplierSeaFreightTransitTime: Yup.string()
                                    .required('Please select the type of cargo'),
                                supplierAirFreightTransitTime: Yup.string()
                                    .required('Please select the HS Code'),
                                supplierWebsite: Yup.string()
                                    .required('Please select the client(s)'),
                                supplierLinkCatalouges: Yup.string()
                                    .required('Please select the supplier')
                            })}
                            onSubmit={fields => {
                                this.onMaterialClick(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialID">Material ID</label>
                                                <Field name="materialID" type="text" className={'form-control' + (errors.materialID && touched.materialID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="materialID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="materialName">Material Name</label>
                                                <Field name="materialName" type="text" className={'form-control' + (errors.materialName && touched.materialName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="materialName" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierNearestSeaPort">Nearest Sea Port</label>
                                                <Field name="supplierNearestSeaPort" type="text" className={'form-control' + (errors.supplierNearestSeaPort && touched.supplierNearestSeaPort ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierNearestSeaPort" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierNearestAirport">Nearest Air port</label>
                                                <Field name="supplierNearestAirport" type="text" className={'form-control' + (errors.supplierNearestAirport && touched.supplierNearestAirport ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierNearestAirport" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierSeaFreightTransitTime">Sea Freight Transit Time</label>
                                                <Field name="supplierSeaFreightTransitTime" type="text" className={'form-control' + (errors.supplierSeaFreightTransitTime && touched.supplierSeaFreightTransitTime ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierSeaFreightTransitTime" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierAirFreightTransitTime">Air Freight Transit Time</label>
                                                <Field name="supplierAirFreightTransitTime" type="text" className={'form-control' + (errors.supplierAirFreightTransitTime && touched.supplierAirFreightTransitTime ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierAirFreightTransitTime" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierWebsite">Website</label>
                                                <Field name="supplierWebsite" type="text" className={'form-control' + (errors.supplierWebsite && touched.supplierWebsite ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierWebsite" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="supplierLinkCatalouges">Link Catalouges</label>
                                                <Field name="supplierLinkCatalouges" type="text" className={'form-control' + (errors.supplierLinkCatalouges && touched.supplierLinkCatalouges ? ' is-invalid' : '')} />
                                                <ErrorMessage name="supplierLinkCatalouges" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-primary-bridge-close" onClick={this.closeModal} >Cancel</button>
                                                <button type="submit" className="btn btn-primary-bridge">Save </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        />
                    </Modal>

                </div>
                <div className="col-lg-11 table-wraper">
                    <table className="table table-hover">
                        <thead className="material-table-th">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Sea Port</th>
                                <th scope="col">Air Port</th>
                                <th scope="col">Sea Transit Time</th>
                                <th scope="col">Air Transit Time</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.supplierListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Supplier;