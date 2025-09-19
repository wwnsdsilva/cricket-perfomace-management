import axios from "../axios"

class PerformanceService {
    getTopBatters = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("performance/top-batters", {
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

    getTopBowlers = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("performance/top-bowlers", {
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

    getTopFielders = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("performance/top-fielders", {
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
    
    getAllPerformanceData = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("performance/all-players", {
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

    getWinLossRatio = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("performance/team/win-loss/1", {
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

    getBattingAverage = async (playerId) => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("performance/batting-average/"+playerId, {
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

    getBowlingAverage = async (playerId) => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("performance/bowling-average/"+playerId, {
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
    
    getPerformanceDetailsByPlayerId = async (playerId) => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("performance/player/"+playerId, {
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

    getBoundaryPerc = async (playerId) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .get("performance/boundary-percentage/"+playerId, {
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
      
    getInjuryImpact = async (playerId) => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("performance/fitness/injuries/"+playerId, {
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

    getNetRunRate = async (teamId) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .get("performance/team/net-run-rate/"+teamId, {
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
    
    getWinLossRatioData = async (teamId) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .get("performance/team/win-loss/"+1, {
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

export default new PerformanceService();