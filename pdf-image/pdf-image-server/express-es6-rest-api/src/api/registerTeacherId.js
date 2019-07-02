import { registerTeacherId } from "../models/connectedTeacherIds";

export default (req, res) => {
    registerTeacherId(req.params.id);
    res.status(200).send();
}