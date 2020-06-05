import { axiosConfigurated as axios } from "@/config/axiosConfigurated";

export default {
  namespaced: true,
  state: {
    status: ""
  },
  mutations: {
    image_request(state) {
      state.status = "loading";
    },
    image_add_success(state) {
      state.status = "success";
    },
    image_get_success(state) {
      state.status = "success";
    },
    image_delete_success(state) {
      state.status = "success";
    },
    image_error(state) {
      state.status = "error";
    }
  },
  actions: {
    uploadImage({ commit }, imageData) {
      return new Promise(function(resolve, reject) {
        commit("image_request");
        axios
          .post("/image", imageData)
          .then(function(response) {
            commit("image_add_success");
            resolve(response.data.imageName);
          })
          .catch(function(err) {
            commit("image_error");
            reject(err.response);
          });
      });
    },
    getImage({ commit }, ImageName) {
      return new Promise(function(resolve, reject) {
        commit("image_request");
        axios({ url: "/image_get", method: "POST", data: ImageName })
          .then(response => {
            commit("image_get_success");
            resolve(response.data);
          })
          .catch(err => {
            commit("image_error");
            reject(err.response);
          });
      });
    },
    deleteImage({ commit }, ImageName) {
      return new Promise(function(resolve, reject) {
        commit("image_request");
        axios({ url: "/image_delete", method: "POST", data: ImageName })
          .then(response => {
            commit("image_delete_success");
            // resolve(response.data);
            resolve();
          })
          .catch(err => {
            commit("image_error");
            reject(err.response);
          });
      });
    }
  },
  getters: {
    getStatus: state => state.status
  }
};
