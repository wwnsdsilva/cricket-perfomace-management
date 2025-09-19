import axios from "../axios"

class AttendanceService {

getAllAttendance = async () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const promise = new Promise((resolve, reject) => {
      axios
        .get("attendance", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          return resolve(res);
        })
        .catch((er) => {
          return resolve(er);
        });
    });
    return await promise;
  };
}

export default new AttendanceService();