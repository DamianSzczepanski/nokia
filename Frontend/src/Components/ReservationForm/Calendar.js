 //Uzyj tego do wyswietlenia dancyh o zaznaczonym obszarze w promptice
import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop/'

import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import 'react-big-calendar/lib/css/react-big-calendar.css'

let testEvents = [
    {
      "start": new Date(2018, 3, 7, 10, 30, 0),
      "end": new Date(2018, 3, 7, 11, 30, 0),
      "title":"MakerSpace John Smith"
    },

    {
      "start": new Date(2018, 3, 7, 12, 30, 0),
      "end": new Date(2018, 3, 7, 13, 30, 0),
      "title":"WholeSpace Jan Kowalski"
    }
  ];

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar)

class Dnd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: testEvents,
      startDate: '',
      endDate: '',
      showCalendar: true,
      slotSelected:'',
    }

    this.moveEvent = this.moveEvent.bind(this);
    this.resizeEvent = this.resizeEvent.bind(this);

  }

  moveEvent({ event, start, end }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })
  }

  handleStartDateSelection(slotInfo){
    this.setState({startDate: new Date(slotInfo.start)})
    //console.log(this.state.startDate)
  }

  handleEndDateSelection(slotInfo){
    this.setState({endDate: new Date(slotInfo.end)})
    //console.log(this.state.endDate)
  }

  handleSlotSelection(slotInfo){
    this.setState({startDate: new Date(slotInfo.start)})
    this.setState({endDate: new Date(slotInfo.end)})
    //this.setState({showCalendar: false})
  }


  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
  }

  render() {
    return (
        <DragAndDropCalendar
          selectable
          events={this.state.events}
          onEventDrop={this.moveEvent}
          defaultView="week"
          defaultDate={new Date()}
          onSelectSlot={
              this.props.onRenderChange

            }
            //this.handleSlotSelection.bind(this),

         />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
