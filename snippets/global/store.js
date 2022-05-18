export const store = {
  state: {
    expElementsArray: [],
  },

  getState: function (property) {
    if (property) {
      return this.state[property]
    } else {
      return this.state
    }
  },
  setState: function (property, value) {
    this.state[property] = value
    localStorage.optimizelyStateExp = JSON.stringify(this.state)
  },
}
