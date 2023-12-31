<template>
    <nav>

        <v-bottom-navigation class = "bottom-navigation-class" background-color="background" color = "button" style="margin-top: 13px;">

            <v-menu 
            ref="allow_date_picker"
            v-model="allow_date_picker"
            :close-on-content-click="false"
            transition="scale-transition"
            dense
          >
            <template v-slot:activator="{ on, attrs }" >

                <v-btn style="max-height: 4vh; margin-top: 1.5vh;" tonal
                    v-bind="attrs"
                    v-on="on"
                >
                
                    <span style="color: #283593; font-weight: bold;">{{"Select Date"}}</span>
                
                </v-btn>

            </template>

            <v-date-picker
                v-model="select_date"
                no-title
                scrollable
                color="date_select"
                :max="frappe.datetime.add_days(frappe.datetime.now_date(true))"
                @input="update_date"
            >
            </v-date-picker>

          </v-menu>
            
            <v-btn style="max-height: 4vh; margin-top: 1.5vh; cursor: unset" @click="previous_week" tonal>
                <span style="color: #283593; font-weight: bold; font-size: 3vh">{{"<"}}</span>
            </v-btn>

            <v-btn style="max-height: 4vh; margin-top: 1.5vh;">
                <span style="color: #1565C0; font-weight: bold;">{{ current_week }}</span>
            </v-btn>

            <v-btn style="max-height: 4vh; margin-top: 1.5vh; cursor: unset" @click="next_week" tonal>
                <span style="color: #283593; font-weight: bold; font-size: 3vh">{{">"}}</span>
            </v-btn>
            
            <v-btn style="max-height: 4vh; margin-top: 1.5vh; cursor: unset" @click="reset" tonal>
                <span style="color: #D32F2F; font-weight: bold; font-size: 2vh">{{"Reset"}}</span>
            </v-btn>

            <v-btn style="max-height: 4vh; margin-top: 1.5vh; cursor: unset" @click="save" tonal>
                <span style="color: #43A047; font-weight: bold; font-size: 2vh">{{ "Save" }}</span>
            </v-btn>

            <v-btn style="max-height: 4vh; margin-top: 1.5vh; cursor: unset" @click="submit">
                <span style="color: #3D5AFE; font-weight: bold; font-size: 2vh">{{ "Submit" }}</span>
            </v-btn>

            <v-btn style="max-height: 4vh; margin-top: 1.5vh; cursor: unset" @click="refresh_page">
                <span style="color: #F4511E; font-weight: bold; font-size: 2vh">{{ "Refresh Page" }}</span>
            </v-btn>

        </v-bottom-navigation>

        <v-snackbar v-model="snack" :timeout="3500" :color="snackColor" right>
            {{ snackText }}
        </v-snackbar>
        
    </nav>
    
</template>

<script>

import { evntBus } from '../bus';

export default {

    data() {

        return {

            start_date_week: '',
            end_date_week: '',
            current_week: '',
            select_date: '',
            process_date: '',
            allow_date_picker: false,

            show_warning: true,
            
            snack: false,
            snackColor: '',
            snackText: '',

            session_user: frappe.session.user
        };

    },

    methods: {

        refresh_page(){
            location.reload();
        },

        update_date() {

            this.allow_date_picker = false

            this.process_date = this.select_date
            
            this.get_week()
        },

        previous_week() {

            this.process_date = frappe.datetime.add_days(this.start_date_week, -1)

            this.get_week()
        },

        next_week() {

            this.process_date = frappe.datetime.add_days(this.end_date_week, 1)
            
            this.get_week()
        },
        
        get_week(){

            var me = this;

            frappe.call({
                method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.find_week",

                args: {
                    date: this.process_date
                },

                callback: function (r) {

                    if(r.message){
                        
                        me.current_week = r.message[0];
                        
                        me.start_date_week = r.message[5];
                        me.end_date_week = r.message[6];

                        evntBus.$emit("update_main_table_header", r.message[1]);
                        evntBus.$emit("update_total_table_header", r.message[2]);
                        evntBus.$emit("main_table_values", r.message[3]);
                        evntBus.$emit("total_table_values", r.message[4]);

                        if(r.message[7]){

                            evntBus.$emit("submitted_record", (true));
                            
                            if (me.show_warning){

                                evntBus.$emit("show_mesage", {
                                    text: r.message[7],
                                    color: "warning",
                                });

                            }
                            
                        }

                        else{
                            evntBus.$emit("submitted_record", (false));
                        }

                        me.show_warning = true
                        
                    }

                }
            })
        },

        reset() {

            var me = this

            frappe.call({
                method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.reset",

                args: {
                    start_date_week: this.start_date_week,
                    end_date_week: this.end_date_week
                },

                callback: function (r) {

                    if(r.message[0]){
                        
                        evntBus.$emit("show_mesage", {
                            text: r.message[1],
                            color: "success",
                        });

                        me.get_week()
                            
                    }

                    else{

                        evntBus.$emit("show_mesage", {
                            text: r.message[1],
                            color: "error",
                        });

                    }

                }
            })
        },

        save() {
            evntBus.$emit("save", this.start_date_week, this.end_date_week);
        },

        submit() {
            evntBus.$emit("submit", this.start_date_week, this.end_date_week);
        },

        show_mesage(data) {

            this.snack = true;
            this.snackColor = data.color;
            this.snackText = data.text;

        },
        
    },

    created: function () {

        this.select_date = frappe.datetime.now_date()

        this.process_date = this.select_date

        this.get_week()

        evntBus.$on('show_mesage', (data) => {
            this.show_mesage(data);
        })

        evntBus.$on("update_after_save_submit", () => {

            this.show_warning = false

            this.get_week()

        });

    },
};
</script>
<style scoped>
  .bottom-navigation-class {
    height: unset !important;
	padding-bottom: 10px !important;
	flex-wrap: wrap !important;
  }
  </style>
