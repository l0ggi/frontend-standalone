<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">l0ggi-standalone</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item to="/">
            <md-icon>auto_graph</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item to="/settings">
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "l0ggiStandalone",
  data: () => ({
    menuVisible: false,
  }),
  computed: {
    sensors() {
      return this.$store.getters.sensors;
    },
    duration() {
      return this.$store.getters.duration;
    },
  },
  mounted() {
    this.sample();
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    async sample() {
      let newTimestamp = {};
      newTimestamp.timestamp = (Date.now() / 1000) | 0;
      newTimestamp.values = [];
      this.sensors.forEach(async (sensor) => {
        let _newValues = {};
        _newValues.uuid = sensor.uuid;
        let response = await axios.get("http://" + sensor.ip);
        response = response.data;
        _newValues.temperature = response.temperature;
        _newValues.humidity = response.humidity;
        newTimestamp.values.push(_newValues);
      });
      this.$store.commit("addSample", newTimestamp);
      window.setTimeout(() => {
        this.sample();
      }, this.duration);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>