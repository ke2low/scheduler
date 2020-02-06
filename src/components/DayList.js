import React from "react";
import DayListItem from "components/DayListItem"


export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <DayListItem
        spots={day.spots}
        key={day.id}
        name={day.name}
        selected={day.name === props.day}
        setDay={props.setDay} />
    );
  });
  return days;
}
