import axios from "../axios"

class AuthService {
    login = async (data) => {
        const promise = new Promise((resolve, reject) => {
          axios
            .post("auth/login", data)
            .then((res) => {
              return resolve(res);
            })
            .catch((er) => {
              return resolve(er);
            });
        });
        return await promise;
      };

      logout = async (email) => {
        const promise = new Promise((resolve, reject) => {
          axios
            .delete("auth/logout/" + email)
            .then((res) => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              localStorage.removeItem("user_id");
              return resolve(res);
            })
            .catch((er) => {
              return resolve(er);
            });
        });
        return await promise;
      };
    
}

export default new AuthService();