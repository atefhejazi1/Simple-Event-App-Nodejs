const db = require('../config/database')

const Event = require('../models/Event')


let newEvent = [
    new Event({
        title: 'Event 1',
        description: 'Bla Bla Bla ',
        location: 'Rafah',
        date: Date.now(), 
        created_at: Date.now()
    }),
    new Event({
        title: 'Event 1',
        description: 'Bla Bla Bla ',
        location: 'Rafah',
        date: Date.now(), 
        created_at: Date.now()
    }),
    new Event({
        title: 'Event 1',
        description: 'Bla Bla Bla ',
        location: 'Rafah',
        date: Date.now(), 
        created_at: Date.now()
    }),
    new Event({
        title: 'Event 1',
        description: 'Bla Bla Bla ',
        location: 'Rafah',
        date: Date.now(), 
        created_at: Date.now()
    }),
]

newEvent.forEach ((event)=>{
    event.save()
})

// let newEvent = new Event({
//     title: 'Event 1',
//     description: 'Bla Bla Bla ',
//     location: 'Rafah',
//     date: Date.now()
// })

// newEvent.save().then(() => console.log('Event Saved!'))
//     .catch(err => console.error(err));