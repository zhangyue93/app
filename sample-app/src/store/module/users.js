const state = {
  users: []
};

const getters = {
  users: state => (state.users ? state.users:[])
};

const mutations = {
  addUser(state, users) {
    state.users=users;
  },
  DEL_ITEM(state,id) {
     const i = state.users.findIndex(x => x.id === id);
           if (i != -1) {
             state.users.splice(i, 1);
           }
    }
  
};

const actions = {
  login(context, users) {
    context.commit("addUser", users);
  },
  
  del_item({commit},id) {
     commit('DEL_ITEM',id)
    }
};

export default {
  state,
  getters,
  mutations,
  actions
};