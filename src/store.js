import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentColor: "green",
    colors: ["green", "blue", "red", "#f0df26"],
    stopwatchStates: ["init", "preparing", "running", "stopped"],
    stopwatchState: "init",
    stopwatchRunning: false,
    stopwatchObject: null,
    currentStopwatchTime: 0,
    interval: null
  },
  mutations: {
    setStopwatchState(state, stateIndex) {
      // Set state and color
      state.stopwatchState = state.stopwatchStates[stateIndex];
      state.currentColor = state.colors[stateIndex];
      // preparing
      if (stateIndex === 1) {
        state.stopwatchRunning = true;
      }
      // running
      if (stateIndex === 2) {
        // Create stopwatch and start it
        state.stopwatchObject = new Vue.prototype.$Stopwatch(true);
      }
      // stopped
      if (stateIndex === 3) {
        // Stops stopwatch
        state.stopwatchObject.stop();
        // set state of stopwatchRunning to false
        state.stopwatchRunning = false;
        
      }
      // init
      if (stateIndex === 0){
        // set stopwatch time to 0
        this.state.currentStopwatchTime = 0;
      }
    }
  },
  actions: {
    startStopwatch() {
      // Check if timer is running
      if (!this.state.stopwatchRunning) {
        // Set stopwatch to running
        this.commit('setStopwatchState', 1);

        // Generates random delay
        let delay = Vue.prototype.$decimal(Vue.prototype.$random() * 10000).floor();

        setTimeout(() => {
          this.commit('setStopwatchState', 2);
          // Set variable to present current time and refresh every 30ms
          this.state.interval = setInterval(() => {
            this.state.currentStopwatchTime =
              new Vue.prototype.$decimal(this.state.stopwatchObject.read()).dividedBy(1000).toFixed(3) +
              " sec.";
          }, 10);
        }, delay);
      }
    },
    stopStopwatch() {
      this.commit('setStopwatchState', 3);

    },
    resetStopwatch() {
      // Clear interval
      clearInterval(this.state.interval);
      this.commit('setStopwatchState', 0);
    }
  },
  getters: {
    getColorById: (state) => (id) => {
      return state.colors[id];
    }
  }
})