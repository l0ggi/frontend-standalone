import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        sensors: [
            {
                name: "dummy",
                ip: "127.0.0.1",
                type: "l0ggi-dummy",
                uuid: "03eeb102-8728-4a9e-b369-b83a7ac70da0",
                firmware: "beta-001",
                last_activity: "0000-00-00 00:00:00",
                has_widget: true,
            },
        ],
        values:
            [
                {
                    timestamp: "0000-00-00 00:00:00", values:
                        [
                            {
                                uuid: "03eeb102-8728-4a9e-b369-b83a7ac70da0",
                                temperature: 217.33,
                                humidity: 69,
                            }
                        ]

                },
            ]
        ,
        settings: {},
    },
    mutations: {
        addSensor(state, sensor) {
            state.sensors.push(sensor)
        }
    },
    actions: {

    },
    getters: {
        sensors: state => state.sensors,
        values: state => state.values,
    }

})

export default store