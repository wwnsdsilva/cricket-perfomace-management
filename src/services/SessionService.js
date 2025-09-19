import axios from "../axios"

class SessionService {
    getAll = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("training-session", {
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

    getAllSessionsWithAttendance = async () => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .get("training-session/attendance", {
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

    getSessionsWithAttendanceForPlayer = async (id) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .get("training-session/attendance/player/"+id, {
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

    getCount = async (status) => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("training-session/count?status="+status, {
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

    // saves only session data and attendance list is auto added by BE
    saveSession = async (data) => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .post("training-session", data, {
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

    // updates only session data and not attendance list
    updateSession = async (data, session_id) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .put("training-session/"+session_id, data, {
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

    // updates attendance status by session and player
    markAttendance = async ( data) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .patch("attendance/mark", data, {
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

    // delete training session and will auto delete attendance list from BE
    deleteSession = async (id) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .delete("training-session/" + id, {
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

export default new SessionService();