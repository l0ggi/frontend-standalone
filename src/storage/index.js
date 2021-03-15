import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        sensors: [
        ],
        values: [
        ],
        settings: {
            sample_duration: 2500,
        },
    },
    mutations: {
        addSensor(state, sensor) {
            state.sensors.push(sensor)
        },
        addSample(state, sample) {
            state.values.push(sample)
        },
        change_sample_duration(state, duration) {
            state.settings.sample_duration = duration
        }
    },
    actions: {

    },
    getters: {
        sensors: state => state.sensors,
        values: state => state.values,
        duration: state => state.settings.sample_duration,
    }

})

export default store