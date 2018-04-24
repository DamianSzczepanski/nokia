import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import NumOfPeopleTextField from './NumOfPeopleTextField'
import SelectRoomField from './SelectRoomField';
import DataTextField from './DataTextField'
import PersonNameTextField from './PersonNameTextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment'


import style from '../../style'

moment().format('MMMM Do YYYY, h:mm:ss a');


class ReservationForm2 extends Component {
  constructor(props){
    super(props);
    this.state ={
      data: [],
      value: 'WholeSpace',
      numOfPeople: '',
      personName: '',
    }
  }

  handleSubmit= (e) =>{
    e.preventDefault();
    let numOfPeople = this.state.numOfPeople.trim();
    let option = this.state.value;
    let startDate = this.props.startDate;
    let endDate = this.props.endDate;;
    let personName = this.state.personName;
    this.props.onReservationSubmit({ numOfPeople: numOfPeople,
                                    option: option,
                                    startDate: startDate,
                                    endDate: endDate,
                                    personName: personName});
    this.setState({numOfPeople: '', option: '', personName: ''})
  }
  
  EditReservation = (e)=> 
  {
    e.preventDefault()
    this.setState({toBeUpdated: !this.state.toBeUpdated});
  }

    handleEditReservation (e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    let numOfPeople = this.state.numOfPeople.trim();
    let option = this.state.value;
    let startDate = this.props.startDate;
    let endDate = this.props.endDate;
    let personName = this.state.personName;
    let reservation = { numOfPeople: numOfPeople,
                                    option: option,
                                    startDate: startDate,
                                    endDate: endDate,
                                    personName: personName};
    this.props.onReservationEdit(id, reservation);
    this.setState({numOfPeople: '', option: '', personName: ''})
  }

  handleNumOfPeopleChange = (e)=> {
    this.setState({numOfPeople: e.target.value});
  }

  handleSelectRoomChange = (event, index, value) => {
    this.setState({value});
  }

  handlePersonNameChange = (e) => {
    this.setState({personName: e.target.value})
  }

  handleClose = () => {
    this.props.closeDialog();
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];
    return (
      <MuiThemeProvider>
        <Dialog
          title="Reservation form"
          modal={false}
          actions={actions}
          open={this.props.isDialogOpen }
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
        {(this.props.anyErrors)
          ?
          (
            <p style={style.errorValidation}>
              {this.props.errData1}
            </p>
          )
        : null}
          {(this.props.anyErrors)
            ?
            (
              <p style={style.errorValidation}>
                {this.props.errData2}
              </p>
            )
          : null}
        <form onSubmit={this.handleSubmit}>
          <DataTextField
            startDate={this.props.startDate}
            endDate={this.props.endDate}
          />
          <SelectRoomField
            value={this.state.value}
            onRoomSelectChange={this.handleSelectRoomChange}
          />
          <NumOfPeopleTextField
            numOfPeople={this.state.numOfPeople}
            onChangeNumOfPeople={this.handleNumOfPeopleChange}
          />
          <PersonNameTextField
            personName={this.state.personName}
            onChangePersonName={this.handlePersonNameChange.bind(this)}
          />

        </form>
        </Dialog>

        </MuiThemeProvider>
    )
  }
}

export default ReservationForm2;
