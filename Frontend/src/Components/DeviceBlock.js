import React, {Component} from 'react'
import axios from 'axios'
import DeviceList from './DeviceList';
import DeviceForm from './DeviceForm';
import style from '../style';

class DeviceBlock extends Component {
  constructor(props){
    super(props);
    this.state = {data: []};
    this.loadDeviceFromServer = this.loadDeviceFromServer.bind(this);
    this.handleDeviceSubmit = this.handleDeviceSubmit.bind(this);
    this.handleDeviceDelete = this.handleDeviceDelete.bind(this);
    //this.pollInterval = null;
  }

  loadDeviceFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({data: res.data});
      })
  }

  handleDeviceSubmit(device){
    let devices = this.state.data;
    device.id = Date.now();
    let newDevices = [...devices,device];
    //this.setState({data: newDevices});
    axios.post(this.props.url, device)
    .then((result) =>{
      this.setState({data:  [...devices,result.data]});
    })
    .catch(err => {
      console.error(err);

    });
  }

  handleDeviceDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        let devices = this.state.data.filter((item) => item._id !== id )
          this.setState({data: devices});
        console.log('device deleted');
      })
      .catch(err => {
        console.error(err);
      });
}

  componentDidMount() {
    this.loadDeviceFromServer();
    //if(!this.pollInterval){
     //this.pollInterval = setInterval(this.loadDeviceFromServer, this.props.pollInterval);
    //}
  }

  componentWillUnmount() {
    //this.pollInterval && clearInterval(this.pollInterval);
  }

  render() {
    return (
      <div style={style.deviceBox}>
        <h3 style={style.title}>Devices:</h3>
      <DeviceList
        onDeviceDelete = {this.handleDeviceDelete}
          data={this.state.data}>
      </DeviceList>

      <DeviceForm onDeviceSubmit={this.handleDeviceSubmit}/>
      </div>

    )
  }
}

export default DeviceBlock;
