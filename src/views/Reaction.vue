<template>
  <div class="reaction">
    <div id="wrapper" :style="{'background-color': computedColorFromStore}">
      <b-col sm="6" class="mx-auto">
        <h1 v-bind:style="{color: 'white'}">Hi!</h1>
        <h2>{{time}}</h2>
        <h4>Instructions</h4>
        <p>Click on "Click here..." to start.</p>
        <p>
          Click Space to begin.
          When color changes to red, click Spacebar to check your reaction time.
        </p>

        <h3
          v-if="currentStopwatchTime !== 0"
          v-bind:style="{color: 'white'}"
        >{{currentStopwatchTime}}</h3>
        <h1 v-else-if="stopwatchRunning" v-bind:style="{color: 'white'}">Prepare Yourself!</h1>
        <b-form-input
          v-on:keyup.space="onSpaceClick"
          v-model="textField"
          v-bind:placeholder="computedPlaceholder"
        ></b-form-input>

        <img class="gif" v-if="stopwatchState === stopwatchStates[2]" src="../assets/tenor.gif" />

        <!--
    <b-col sm="1" md="1" class="mx-auto">
      <b-form-input
        v-bind:style="{backgroundColor: computedButtonColor}"
        v-show="stopwatchState === stopwatchStates[0]"
        v-on:keyup.space="start"
        ref="start"
      >Start</b-form-input>
      <b-form-input
        v-bind:style="{backgroundColor: computedButtonColor}"
        v-show="stopwatchState === stopwatchStates[1]"
        v-on:keyup.space="stop"
        ref="stop"
      >Stop</b-form-input>
      <b-form-input
        v-bind:style="{backgroundColor: computedButtonColor}"
        v-show="stopwatchState === stopwatchStates[2]"
        v-on:keyup.space="reset"
        ref="reset"
      >Reset</b-form-input>
    </b-col>
        -->
      </b-col>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval, setTimeout } from "timers";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "reaction",
  data() {
    return {
      time: this.$moment().format("HH:mm"),
      textField: ""
    };
  },
  computed: {
    computedColorFromStore() {
      return this.currentColor;
    },
    computedColorFromStoreById() {
      return this.$store.getters.getColorById(0);
    },
    computedPlaceholder() {
      if (this.currentState === this.stopwatchStates[3]) {
        return "Click space to reset";
      } else {
        return "Click here...";
      }
    },
    /*
    computedColor() {
      return this.color;
    },
    */
    // This maps this.$store.state.color to this.color.
    ...mapState([
      /// Maps state.color to this.color
      // 'color',
      /// This can have different name (color: ) can have different name
      "currentColor",
      "stopwatchState",
      "stopwatchStates",
      "stopwatchRunning",
      "currentStopwatchTime"
    ])
  },

  methods: {
    ...mapActions(["startStopwatch", "stopStopwatch", "resetStopwatch"]),

    onSpaceClick(event) {
      //Start
      if (this.stopwatchState === this.stopwatchStates[0]) {
        this.startStopwatch();
      }
      // Stop
      else if (this.stopwatchState === this.stopwatchStates[2]) {
        this.stopStopwatch();
      }
      // Reset
      else if (this.stopwatchState === this.stopwatchStates[3]) {
        this.resetStopwatch();
      }
      //Reset textfield
      this.textField = "";
    }
    /*
    start() {
      // Check if timer is running
      if (!this.timerRunning) {
        //Set timer to running
        this.timerRunning = true;

        //this.$emit("change-bg", "red");
        //this.$store.actions.setColor("red");
        
        // Generates random delay
        let delay = this.$decimal(this.$random() * 10000).floor();

        setTimeout(() => {
          // Set timer to not running
          this.timerRunning = false;

          //Change Stopwatch state to running
          this.stopwatchState = this.stopwatchStates[1];

          //Create Stopwatch
          this.sw1 = new this.$Stopwatch(true);
          // Set variable to present current time and refresh every 30ms
          this.interval = setInterval(() => {
            this.stopwatchTime =
              new this.$decimal(this.sw1.read()).dividedBy(1000).toFixed(3) +
              " sec.";
          }, 10);
          this.color = "red";
        }, delay);
      }
    },
    stop() {
      // Stop Stopwatch
      this.sw1.stop();
      // Stop interval
      clearInterval(this.interval);
      // Set stopwatch state to stopped
      this.stopwatchState = this.stopwatchStates[2];
      this.color = "blue";
    },
    reset() {
      // Set state to init
      this.stopwatchState = this.stopwatchStates[0];
      this.stopwatchTime = 0;
      this.color = "green";
    }
    */
  }
};
</script>
<style scoped>
.btn {
  background-color: green;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  color: white;
  white-space: pre-line;
}

.reaction {
  padding-top: 50px;
}

.gif {
  padding-top: 10px;
  width: 45vw;
}

#wrapper {
  height: 100vh;
}
</style>
