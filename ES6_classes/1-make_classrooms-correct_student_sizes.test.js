import initializeRooms from './1-make_classrooms.js';

test("Each ClassRoom instance in the returned array has the correct max student size", () => {
    expect(initializeRooms()[0]._maxStudentsSize).toBe(19);
    expect(initializeRooms()[1]._maxStudentsSize).toBe(20);
    expect(initializeRooms()[2]._maxStudentsSize).toBe(34);
});
