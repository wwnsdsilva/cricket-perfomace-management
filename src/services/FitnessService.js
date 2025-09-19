import axios from "../axios"

class FitnessService {
    getAll = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("fitness-test", {
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
   
    getFitnessByPlayerId = async (playerId) => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("fitness-test/"+playerId, {
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

    update = async (data, fitness_id) => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .put("fitness-test/"+fitness_id, data, {
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

export default new FitnessService();