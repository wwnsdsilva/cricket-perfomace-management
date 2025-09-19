import axios from "../axios"

class InjuryService {
    getAll = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("injury", {
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

    getInjuryByPlayerId = async (id) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .get("injury/player/"+id, {
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

    getCount = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("injury/count", {
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

    saveInjury = async (data) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .post("injury", data, {
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

    updateInjury = async (data, injury_id) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .put("injury/"+injury_id, data, {
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

    deleteInjury = async (id) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .delete("injury/" + id, {
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

export default new InjuryService();