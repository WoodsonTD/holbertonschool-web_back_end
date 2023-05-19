import initializeRooms from './1-make_classrooms.js';

test("initializeRooms returns an array of 3 ClassRoom instances", () => {
    expect(initializeRooms().length).toBe(3);
});
