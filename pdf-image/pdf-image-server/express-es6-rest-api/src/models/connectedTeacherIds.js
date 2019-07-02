const teacherIds = {};

export function registerTeacherId(id) {
    teacherIds[id] = false;
}

export function teacherConnected(id) {
    teacherIds[id] = true;
}

export function teacherDisconnected(id) {
    teacherIds[id] = false;
}

export default teacherIds;