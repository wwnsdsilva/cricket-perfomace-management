import axios from "../axios"

class EventService {
    getAll = async () => {
        const access_token = JSON.parse(localStorage.getItem("access_token"));
        const promise = new Promise((resolve, reject) => {
          axios
            .get("event", {
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
    saveEvent = async (data) => {
      console.log(data);
      const access_token = JSON.parse(localStorage.getItem("access_token"));
    
      // Copy everything except image into the JSON body
      const eventJson = { ...data };
      delete eventJson.image;

      console.log(eventJson);

      // create FormData
      const formData = new FormData();
      formData.append(
        "event",
        new Blob([JSON.stringify(eventJson)], { type: "application/json" })
      );
    
      // Append the image only if it exists
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const promise = new Promise((resolve, reject) => {
        axios
          .post("event", formData, {
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
    updateEvent = async (data, event_id) => {
      console.log(data);
      const access_token = JSON.parse(localStorage.getItem("access_token"));
    
      // Copy everything except image into the JSON body
      const { image, ...eventJson } = data || {};
      console.log(eventJson);
  
      // create FormData
      const formData = new FormData();
      formData.append(
        "event",
        new Blob([JSON.stringify(eventJson)], { type: "application/json" })
      );
    
      // Append the image only if it exists
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
  
      const promise = new Promise((resolve, reject) => {
        axios
          .put("event/"+event_id, formData, {
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

    // Delete event & Image
    deleteEvent = async (id) => {
      const access_token = JSON.parse(localStorage.getItem("access_token"));
      const promise = new Promise((resolve, reject) => {
        axios
          .delete("event/" + id, {
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

export default new EventService();