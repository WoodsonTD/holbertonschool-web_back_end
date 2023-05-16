import ClassRoom from './0-classroom';

function initializeRooms() {
  const sizes = [19, 20, 34];
  return sizes.map((size) => new ClassRoom(size));
}

const rooms = initializeRooms();
console.log(rooms);
console.log(rooms[0]._maxStudentsSize);
console.log(rooms[1]._maxStudentsSize);
console.log(rooms[2]._maxStudentsSize);
