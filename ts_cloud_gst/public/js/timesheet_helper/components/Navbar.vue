<template>
    <nav>
        <v-app-bar app height="40" class="elevation-2" color="background">

            <v-toolbar-title>

                <span style="color: #1565C0; font-size: 4vh">TSheets</span>
            
            </v-toolbar-title>

            <v-spacer></v-spacer>
            
            <v-btn style="cursor: unset; font-weight: bold;" text color="button" @click="go_desk">
                <span right>{{ "Go To Home" }}</span>
            </v-btn>

            <!-- <v-btn style="cursor: unset" text color="button" @click="logOut">
                <span right>{{ "Logout" }}</span>
            </v-btn> -->

        </v-app-bar>

        <v-bottom-navigation background-color="background" color = "button" style="max-height: 7vh; height: 7vh; margin-top: 13px;">

            <v-menu 
            ref="allow_date_picker"
            v-model="allow_date_picker"
            :close-on-content-click="false"
            transition="scale-transition"
            dense
          >
            <template v-slot:activator="{ on, attrs }" >
                <v-btn style="margin-left: 0vh; max-width: 30vh"
                    v-bind="attrs"
                    v-on="on"
                >
                
                    <span style="color: #283593; font-weight: bold;" right>{{"Select Date"}}</span>
                
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
            
            <v-btn style="margin-left: 5vh; max-height: 7vh; cursor: unset" @click="previous_week">
                <span style="color: #283593; font-weight: bold; font-size: 3vh" right>{{"<"}}</span>
            </v-btn>

            <span style="margin-top: 12px; margin-left: 2vh; color: #1565C0; font-weight: bold;">{{ current_week }}</span>

            <v-btn style="margin-left: 2vh; max-height: 7vh; cursor: unset" @click="next_week">
                <span style="color: #283593; font-weight: bold; font-size: 3vh" right>{{">"}}</span>
            </v-btn>
            
            <v-btn style="margin-left: 80vh; max-height: 7vh; cursor: unset" @click="reset">
                <span style="color: #283593; font-weight: bold; font-size: 2vh" right>{{"Reset"}}</span>
            </v-btn>

            <v-btn style="margin-left: 3vh; max-height: 7vh; cursor: unset" @click="save">
                <span style="color: #283593; font-weight: bold; font-size: 2vh" right>{{ "Save" }}</span>
            </v-btn>

            <v-btn style="margin-left: 3vh; max-height: 7vh; cursor: unset" @click="submit">
                <span style="color: #283593; font-weight: bold; font-size: 2vh" right>{{ "Submit" }}</span>
            </v-btn>

        </v-bottom-navigation>

        <v-snackbar v-model="snack" :timeout="2500" :color="snackColor" top right>
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
            
            snack: false,
            snackColor: '',
            snackText: '',
        };

    },

    methods: {

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

                            evntBus.$emit("show_mesage", {
                                text: r.message[7],
                                color: "warning",
                            });
                            
                        }
                        
                    }

                }
            })
        },

        go_desk() {
            frappe.set_route('/');
            location.reload();
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
        
        // logOut() {
        //     var me = this;
        //     me.logged_out = true;

        //     return frappe.call({
        //         method: 'logout',
                
        //         callback: function (r) {
        //             if (r.exc) {
        //                 return;
        //             }

        //             frappe.set_route('/login');
        //             location.reload();
        //         },
        //     });
        // },

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

    },
};
</script>

