import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '123'
  }),
  actions: {},
  getters: {}
})
