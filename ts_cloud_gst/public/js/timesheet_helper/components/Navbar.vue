<template>
    <nav>
        <v-app-bar app height="40" class="elevation-2" color="background">

            <v-toolbar-title>

                <span style="color: #1565C0; font-size: 4vh">TSheets</span>
            
            </v-toolbar-title>
    
            <v-spacer></v-spacer>

            <!-- <v-btn style="cursor: unset" text color="button" @click="go_desk">
                <span right>{{ "Go To Home" }}</span>
            </v-btn>

            <v-btn style="cursor: unset" text color="button" @click="logOut">
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
            
            <v-btn style="margin-left: 5vh; max-height: 7vh; cursor: unset">
                <span style="color: #283593; font-weight: bold; font-size: 3vh" right>{{"<"}}</span>
            </v-btn>

            <span style="margin-top: 12px; margin-left: 2vh; color: #1565C0; font-weight: bold;">{{ current_week }}</span>

            <v-btn style="margin-left: 2vh; max-height: 7vh; cursor: unset">
                <span style="color: #283593; font-weight: bold; font-size: 3vh" right>{{">"}}</span>
            </v-btn>
            
            <v-btn style="margin-left: 80vh; max-height: 7vh; cursor: unset">
                <span style="color: #283593; font-weight: bold; font-size: 2vh" right>{{"Reset"}}</span>
            </v-btn>

            <v-btn style="margin-left: 3vh; max-height: 7vh; cursor: unset">
                <span style="color: #283593; font-weight: bold; font-size: 2vh" right>{{ "Save" }}</span>
            </v-btn>

            <v-btn style="margin-left: 3vh; max-height: 7vh; cursor: unset">
                <span style="color: #283593; font-weight: bold; font-size: 2vh" right>{{ "Submit" }}</span>
            </v-btn>

        </v-bottom-navigation>
        
    </nav>
    
</template>

<script>

import { evntBus } from '../bus';

export default {

    data() {

        return {

        current_week: '',
        select_date: '',
        allow_date_picker: false,
        
        };

    },

    methods: {

        update_date() {

            this.allow_date_picker = false
            
            this.get_week()
        },
        
        get_week(){
            var me = this;

            frappe.call({
                method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.find_week",
                args: {
                    date: this.select_date
                },

                callback: function (r) {

                    if(r.message){
                        
                        me.current_week = r.message[0]
                        evntBus.$emit("update_main_table_header", r.message[1]);
                        evntBus.$emit("update_total_table_header", r.message[2]);
                        evntBus.$emit("main_table_values", r.message[3]);
                        evntBus.$emit("total_table_values", r.message[4]);
                        
                    }

                }
            })
        },

        go_desk() {
            frappe.set_route('/');
            location.reload();
        },
        
        logOut() {
            var me = this;
            me.logged_out = true;

            return frappe.call({
                method: 'logout',
                
                callback: function (r) {
                    if (r.exc) {
                        return;
                    }

                    frappe.set_route('/login');
                    location.reload();
                },
            });
        },
        
    },

    created: function () {

        this.select_date = frappe.datetime.now_date()

        this.get_week()

    },
};
</script>

