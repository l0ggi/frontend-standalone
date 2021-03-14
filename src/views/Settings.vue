<template>
  <div>
    <div>
      <md-card>
        <md-card-header>
          <div>Add new Sensor</div>
        </md-card-header>
        <md-card-content style="margin-top: -1vh">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-15">
              <md-field
                class=""
                v-bind:class="{ 'md-invalid': new_sensor_query_error }"
              >
                <label>IP-Adrress</label>
                <md-input
                  placeholder="0.0.0.0"
                  v-model="new_sensor.ip"
                  :disabled="new_sensor.uuid != ''"
                ></md-input>
                <span class="md-error" v-if="!$v.new_sensor.ip.required"
                  >The IP Address is required</span
                >
                <span class="md-error" v-if="new_sensor_query_error">{{
                  new_sensor_query_error
                }}</span>
              </md-field>
            </div>
            <div v-if="new_sensor.uuid == ''" class="md-layout-item md-size-1">
              <md-field style="width: 0vw">
                <md-button
                  @click="validateIp()"
                  :disabled="sending"
                  class="md-icon-button md-dense md-raised md-primary"
                >
                  <md-icon>cached</md-icon>
                </md-button>
              </md-field>
            </div>
            <div v-if="new_sensor.uuid != ''" class="md-layout-item">
              <md-field>
                <label>Name</label>
                <md-input
                  placeholder="i.e. Living Room"
                  v-model="new_sensor.name"
                ></md-input>
              </md-field>
            </div>
            <div v-if="new_sensor.uuid != ''" class="md-layout-item">
              <md-field>
                <label>UUID</label>
                <md-input
                  placeholder="c08e6b42-c23f-44e3-9957-c8ebc91dd942"
                  v-model="new_sensor.uuid"
                  disabled
                ></md-input>
              </md-field>
            </div>
            <div v-if="new_sensor.uuid != ''" class="md-layout-item">
              <md-field>
                <label>Type</label>
                <md-input
                  placeholder="l0ggi-v1"
                  v-model="new_sensor.type"
                  disabled
                ></md-input>
              </md-field>
            </div>
            <div v-if="new_sensor.uuid != ''" class="md-layout-item">
              <md-switch v-model="new_sensor.has_widget" class="md-primary"
                >Create a Widget</md-switch
              >
            </div>
            <div v-if="new_sensor.uuid != ''" class="md-layout-item">
              <md-field style="width: 0vw">
                <md-button @click="saveSensor" class="md-raised md-primary"
                  >&nbsp;&nbsp;Save&nbsp;&nbsp;</md-button
                >
                <md-button @click="clearForm" class="md-raised md-accent"
                  >Reset</md-button
                >
              </md-field>
            </div>
          </div>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
        </md-card-content>
      </md-card>
    </div>
    <div style="margin-top: 1vh">
      <md-table v-model="sensors" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Registered Sensors</h1>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="UUID" md-sort-by="uuid">{{
            item.uuid
          }}</md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name">{{
            item.name
          }}</md-table-cell>
          <md-table-cell md-label="IP" md-sort-by="ip">{{
            item.ip
          }}</md-table-cell>
          <md-table-cell md-label="Type" md-sort-by="type">{{
            item.type
          }}</md-table-cell>
          <md-table-cell md-label="Firmware" md-sort-by="firmware">{{
            item.firmware
          }}</md-table-cell>
          <md-table-cell md-label="Last Activity" md-sort-by="last_activity">{{
            item.last_activity ? item.last_activity : "Inactive"
          }}</md-table-cell>
          <md-table-cell md-label="Widget" md-sort-by="widget">
            <md-switch v-model="item.has_widget" disabled></md-switch
          ></md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required, minLength, ipAddress } from "vuelidate/lib/validators";
export default {
  name: "Settings",
  mixins: [validationMixin],
  data: () => ({
    new_sensor: {
      ip: "",
      uuid: "",
      name: "",
      type: "",
      firmware: "",
      last_activity: "",
      has_widget: false,
    },
    new_sensor_query_error: false,
    sending: false,
  }),
  validations: {
    new_sensor: {
      ip: {
        required,
        ipAddress,
        minLength: minLength(7), // 4 digits + 3 points
      },
    },
  },
  mounted() {},
  computed: {
    sensors() {
      return this.$store.getters.sensors;
    },
  },
  methods: {
    clearForm() {
      this.$v.$reset();
      this.new_sensor.uuid = "";
      this.new_sensor.name = "";
      this.new_sensor.type = "";
      this.new_sensor.firmware = "";
      this.new_sensor.last_activity = "";
      this.new_sensor.has_widget = false;
      this.new_sensor_query_error = false;
    },
    querySensor() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.sending = false;
        //this.clearForm();

        //this.new_sensor_query_error = "Error 404: Not Found";
        this.new_sensor.uuid = "XXX";
      }, 1500);
    },
    validateIp() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.querySensor();
      } else {
        this.new_sensor_query_error = "Invalid IP (IPv4 only)";
      }
    },
    saveSensor() {
      this.$store.commit("addSensor", this.new_sensor);
      console.log(this.new_sensor);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>