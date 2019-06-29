import merge from 'app/core/merge'
import addTag from 'app/core/addTag'
import RoomListItem from 'app/ui/RoomListItem'

export function addMessage(room, msg) {
  if (msg.room === room.id) {
    return merge(room, {
      history: room.history.concat(msg)
    })
  }

  return room
}

export function activate(room) {
  return addTag(room, ':room/active')
}

export function renderListItem(room) {
  return React.createElement(RoomListItem, {
    key: room.id,
    room: room
  })
}
