<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item md-size-15" v-for="sensor in sensors_with_widget" :key="sensor.uuid">
        <widget :values="values_for_sensor(sensor.uuid)">
          <template #title>{{sensor.name}}</template>
        </widget>
      </div>
    </div>
  </div>
</template>

<script>
import widget from "@/components/tempWidget";
export default {
  components: {
    widget,
  },
  mounted() {
  },
  computed: {
    sensors() {
      return this.$store.getters.sensors;
    },
    values() {
      return this.$store.getters.values;
    },
    most_recent_values() {
      return this.values[this.values.length - 1];
    },
    sensors_with_widget() {
      return this.sensors.filter((obj) => obj.has_widget === true);
    },
  },
  methods: {
    values_for_sensor(sensor) {
      let _sensor = sensor;
      return this.most_recent_values.values.filter(
        (obj) => obj.uuid === _sensor
      )[0];
    },
  },
};
</script>
