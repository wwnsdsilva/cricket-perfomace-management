import axios from "../axios"

class PlayerService {
    getAll = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("player", {
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
    
    searchPlayerById = async (id) => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("player/"+id, {
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
            .get("player/count", {
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
    savePlayer = async (data) => {
      console.log(data);
      const access_token = JSON.parse(localStorage.getItem("access_token"));
    
      // Copy everything except image into the JSON body
      const playerJson = { ...data };
      delete playerJson.image;

      // Inject system-generated credentials
      playerJson.username = `${playerJson.first_name}_${Math.random().toString(36).substring(2, 8)}`;
      playerJson.password = playerJson.username; // random password
      playerJson.user_role = "PLAYER";
      playerJson.team = {"id": 1};

      console.log(playerJson);

      // Copy everything except image into the JSON body
      // const { image, ...playerJson } = data || {};

      // create FormData
      const formData = new FormData();
      formData.append(
        "player",
        new Blob([JSON.stringify(playerJson)], { type: "application/json" })
      );
    
      // Append the image only if it exists
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      // if (data.image) {
      //   formData.append("image", data.image); // must be a File object (from input[type="file"])
      // }
      
      const promise = new Promise((resolve, reject) => {
        axios
          .post("player", formData, {
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

    // With image
    updatePlayer = async (data, player_id) => {
    console.log(data);
    const access_token = JSON.parse(localStorage.getItem("access_token"));
  
    // Copy everything except image into the JSON body
    const { image, ...playerJson } = data || {};
    console.log(playerJson);

    // create FormData
    const formData = new FormData();
    formData.append(
      "player",
      new Blob([JSON.stringify(playerJson)], { type: "application/json" })
    );
  
    // Append the image only if it exists
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const promise = new Promise((resolve, reject) => {
      axios
        .put("player/"+player_id, formData, {
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

    // Delete player & Image
    deletePlayer = async (id) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .delete("player/" + id, {
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

export default new PlayerService();