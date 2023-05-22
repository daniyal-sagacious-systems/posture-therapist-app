
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Event added',
    // start: todayStr + 'T12:00:00'
    // start: new Date('Thu Mar 16 2023 00:00:00 GMT+0500 (Pakistan Standard Time)').toISOString().replace(/T.*$/, '')  + 'Thu Mar 16 2023 00:00:00 GMT+0500 (Pakistan Standard Time)',
    start: new Date('Sat Mar 17 2023 14:00:00 GMT+0500 (Pakistan Standard Time)').toISOString().replace(/T.*$/, ''),
    end: new Date('Sat Mar 19 2023 19:00:00 GMT+0500 (Pakistan Standard Time)').toISOString().replace(/T.*$/, ''),

    // end: 'Fri Mar 17 2023 00:00:00 GMT+0500 (Pakistan Standard Time)'
  }

]

export function createEventId() {
  return String(eventGuid++)
}
