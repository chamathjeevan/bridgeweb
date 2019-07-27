import React, { Component } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

var urlMaterialService = 'http://localhost:3010/1001/'

class RegulatoryApproval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ApprovalID: '',
            ApprovalType: '',
            ApprovalObtainingStage: '',
            Institute: '',
            Reference: '',
            SampleRequired: false,
            ReleaseTimeInDays: 0,
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
                    <td>{data[k].ApprovalType}</td>
                    <td>{data[k].ApprovalObtainingStage}</td>
                    <td>{data[k].Institute}</td>
                    <td>{data[k].Reference}</td>
                    <td>{data[k].SampleRequired}</td>
                    <td>{data[k].ReleaseTimeInDays}</td>
                    </tr>);
                    break;
                }
                this.setState({ approvalListOptions: arrOptions });
            })
            .catch(console.log)
    }

    componentDidMount() {

        this.loadDropdown(urlMaterialService + 'regapproval')

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
        if (fields.materialID !== 'NEW_APPROVAL') {
            METHOD = 'PUT';
            mtID = fields.materialID;
        }
        fetch(urlMaterialService + 'regapproval', {
            method: METHOD,
            body: JSON.stringify({
                
                ID: fields.ApprovalID,
                ApprovalType: fields.ApprovalType,
                ApprovalObtainingStage:  fields.ApprovalObtainingStage,
                Institute:  fields.Institute,
                Reference:  fields.Reference,
                SampleRequired:  fields.SampleRequired,
                ReleaseTimeInDays:  fields.ReleaseTimeInDays
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {

            if (response.status === 200 || response.status === 201) {
                alert('Approval is success fully saved');
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
                
                                ApprovalID: '',
                                ApprovalType: '',
                                ApprovalObtainingStage: '',
                                Institute: '',
                                Reference: '',
                                SampleRequired: false,
                                ReleaseTimeInDays: 0,
                            }}
                            validationSchema={Yup.object().shape({
                                ApprovalID: Yup.string()
                                    .required('Approval id is required'),
                                ApprovalType: Yup.string()
                                    .required('Approval type is required.'),
                                ApprovalObtainingStage: Yup.string()
                                    .required('Approval obtaining stage is required.'),
                                Institute: Yup.string()
                                    .required('Approval institute is required.'),
                                Reference: Yup.string()
                                    .required('Please select the type of cargo'),
                                SampleRequired: Yup.boolean()
                                    .required('Is sample required'),
                                ReleaseTimeInDays: Yup.string()
                                    .required('Release id is required')
                            })}
                            onSubmit={fields => {
                                this.onMaterialClick(fields);
                            }}
                            render={({ errors, status, touched }) => (
                                <Form>
                                    <div className="row pr-3 pl-3">
                                        <div className="col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalID">Approval ID</label>
                                                <Field name="ApprovalID" type="text" className={'form-control' + (errors.ApprovalID && touched.ApprovalID ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalID" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalType">ApprovalT ype</label>
                                                <Field name="ApprovalType" type="text" className={'form-control' + (errors.ApprovalType && touched.ApprovalType ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalType" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ApprovalObtainingStage">Obtaining Stage</label>
                                                <Field name="ApprovalObtainingStage" type="text" className={'form-control' + (errors.ApprovalObtainingStage && touched.ApprovalObtainingStage ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ApprovalObtainingStage" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="Institute">Institute</label>
                                                <Field name="Institute" type="text" className={'form-control' + (errors.Institute && touched.Institute ? ' is-invalid' : '')} />
                                                <ErrorMessage name="Institute" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="Reference">Reference</label>
                                                <Field name="Reference" type="text" className={'form-control' + (errors.Reference && touched.Reference ? ' is-invalid' : '')} />
                                                <ErrorMessage name="Reference" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>

                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="SampleRequired">Sample Required</label>
                                                <Field name="SampleRequired" type="checkbox" className={'form-control' + (errors.SampleRequired && touched.SampleRequired ? ' is-invalid' : '')} />
                                                <ErrorMessage name="SampleRequired" component="div" className="invalid-feedback" />
                                            </div>

                                        </div>
                                        <div className=" col-6 form-box mt-2">
                                            <div className="form-group">
                                                <label htmlFor="ReleaseTimeInDays">Release Time In Days</label>
                                                <Field name="ReleaseTimeInDays" type="text" className={'form-control' + (errors.ReleaseTimeInDays && touched.ReleaseTimeInDays ? ' is-invalid' : '')} />
                                                <ErrorMessage name="ReleaseTimeInDays" component="div" className="invalid-feedback" />
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
                                <th scope="col">Approval Type</th>
                                <th scope="col">Approval Obtaining Stage</th>
                                <th scope="col">Institute</th>
                                <th scope="col">Reference</th>
                                <th scope="col">Sample Required</th>
                                <th scope="col">Release Time In Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.approvalListOptions}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default RegulatoryApproval;