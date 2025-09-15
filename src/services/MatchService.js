import axios from "../axios"

class MatchService {
    getAll = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("match", {
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

      // With image
      saveMatch = async (data) => {
      console.log(data);
      const access_token = JSON.parse(localStorage.getItem("access_token"));
    
      // Copy everything except image into the JSON body
      const matchJson = { ...data };
      delete matchJson.image;

      console.log(matchJson);

      // Copy everything except image into the JSON body
      // const { image, ...matchJson } = data || {};

      // create FormData
      const formData = new FormData();
      formData.append(
        "match",
        new Blob([JSON.stringify(matchJson)], { type: "application/json" })
      );
    
      // Append the image only if it exists
      if (data.image instanceof File) {
        formData.append("image", data.image); // must be a File object (from input[type="file"])
      }

      const promise = new Promise((resolve, reject) => {
        axios
          .post("match", formData, {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "multipart/form-data",
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

    saveMatchStats = async (data) => {
      console.log(data);
      const access_token = JSON.parse(localStorage.getItem("access_token"));
    
      const promise = new Promise((resolve, reject) => {
        axios
          .put("match/stats", data, {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json"
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

    updateScheduledMatch = async (data) => {
      console.log(data);
      const access_token = JSON.parse(localStorage.getItem("access_token"));
    
      const promise = new Promise((resolve, reject) => {
        axios
          .patch("match/scheduled/"+ data.id, data, {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json"
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

    // Delete match, inning, batting, bowling & fielding stats
    deleteMatch = async (id) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .delete("match/" + id, {
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

export default new MatchService();