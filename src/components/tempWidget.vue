<template>
  <div>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title" style="text-align: center; margin-top: -1vh">
            <slot name="title"></slot>
          </div>
        </md-card-header>
        <hr style="margin-top: -1vh" />
        <md-card-content style="margin-top: -1vh">
          <md-list class="md-dense">
            <md-list-item v-if="values.temperature > 0">
              <md-icon>device_thermostat</md-icon>
              <span class="md-list-item-text">{{ values.temperature }} °C</span>
            </md-list-item>

            <md-list-item v-if="values.humidity > 0">
              <md-icon>water_damage</md-icon>
              <span class="md-list-item-text">{{ values.humidity }} %</span>
            </md-list-item>

            <md-list-item v-if="values.light > 0">
              <md-icon>wb_sunny</md-icon>
              <span class="md-list-item-text">{{ values.light }} Lux</span>
            </md-list-item>

            <md-list-item v-if="values.nox > 0">
              <span>NOX</span>
              <span class="md-list-item-text">{{ values.nox }}</span>
            </md-list-item>

            <md-list-item v-if="values.co2 > 0">
              <span>CO2</span>
              <span class="md-list-item-text">{{ values.co2 }}</span>
            </md-list-item>
          </md-list>
        </md-card-content>
      </md-ripple>
    </md-card>
  </div>
</template>

<script>
export default {
  props: {
    values: Object,
  },
};
</script>