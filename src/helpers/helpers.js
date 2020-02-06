export const updateSpots = (change, dayOfWeek, state) => {

  const updatedSpots = state.days.map((day) => {
    if (day.name === dayOfWeek.name) {
      if (change === 'create' && day.spots - 1 >= 0) {
        return { ...day, spots: day.spots - 1 }
      } else if (change === 'delete' && day.spots + 1 <= 5) {
        return { ...day, spots: day.spots + 1 }
      }
    }
    return day;
  });
  return updatedSpots;
};