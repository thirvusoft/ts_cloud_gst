(() => {
  // ../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/bus.js
  var evntBus = new Vue();

  // ../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/components/Navbar.vue
  var __vue_script__ = {
    data() {
      return {
        start_date_week: "",
        end_date_week: "",
        current_week: "",
        select_date: "",
        process_date: "",
        allow_date_picker: false,
        show_warning: true,
        snack: false,
        snackColor: "",
        snackText: "",
        session_user: frappe.session.user
      };
    },
    methods: {
      refresh_page() {
        location.reload();
      },
      update_date() {
        this.allow_date_picker = false;
        this.process_date = this.select_date;
        this.get_week();
      },
      previous_week() {
        this.process_date = frappe.datetime.add_days(this.start_date_week, -1);
        this.get_week();
      },
      next_week() {
        this.process_date = frappe.datetime.add_days(this.end_date_week, 1);
        this.get_week();
      },
      get_week() {
        var me = this;
        frappe.call({
          method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.find_week",
          args: {
            date: this.process_date
          },
          callback: function(r) {
            if (r.message) {
              me.current_week = r.message[0];
              me.start_date_week = r.message[5];
              me.end_date_week = r.message[6];
              evntBus.$emit("update_main_table_header", r.message[1]);
              evntBus.$emit("update_total_table_header", r.message[2]);
              evntBus.$emit("main_table_values", r.message[3]);
              evntBus.$emit("total_table_values", r.message[4]);
              if (r.message[7]) {
                evntBus.$emit("submitted_record", true);
                if (me.show_warning) {
                  evntBus.$emit("show_mesage", {
                    text: r.message[7],
                    color: "warning"
                  });
                }
              } else {
                evntBus.$emit("submitted_record", false);
              }
              me.show_warning = true;
            }
          }
        });
      },
      reset() {
        var me = this;
        frappe.call({
          method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.reset",
          args: {
            start_date_week: this.start_date_week,
            end_date_week: this.end_date_week
          },
          callback: function(r) {
            if (r.message[0]) {
              evntBus.$emit("show_mesage", {
                text: r.message[1],
                color: "success"
              });
              me.get_week();
            } else {
              evntBus.$emit("show_mesage", {
                text: r.message[1],
                color: "error"
              });
            }
          }
        });
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
      }
    },
    created: function() {
      this.select_date = frappe.datetime.now_date();
      this.process_date = this.select_date;
      this.get_week();
      evntBus.$on("show_mesage", (data) => {
        this.show_mesage(data);
      });
      evntBus.$on("update_after_save_submit", () => {
        this.show_warning = false;
        this.get_week();
      });
    }
  };
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("nav", [
      _c("v-bottom-navigation", {
        staticClass: "bottom-navigation-class",
        staticStyle: { "margin-top": "13px" },
        attrs: { "background-color": "background", color: "button" }
      }, [
        _c("v-menu", {
          ref: "allow_date_picker",
          attrs: {
            "close-on-content-click": false,
            transition: "scale-transition",
            dense: ""
          },
          scopedSlots: _vm._u([
            {
              key: "activator",
              fn: function(ref) {
                var on = ref.on;
                var attrs = ref.attrs;
                return [
                  _c("v-btn", _vm._g(_vm._b({
                    staticStyle: {
                      "max-height": "4vh",
                      "margin-top": "1.5vh"
                    },
                    attrs: { tonal: "" }
                  }, "v-btn", attrs, false), on), [
                    _c("span", {
                      staticStyle: {
                        color: "#283593",
                        "font-weight": "bold"
                      }
                    }, [_vm._v(_vm._s("Select Date"))])
                  ])
                ];
              }
            }
          ]),
          model: {
            value: _vm.allow_date_picker,
            callback: function($$v) {
              _vm.allow_date_picker = $$v;
            },
            expression: "allow_date_picker"
          }
        }, [
          _vm._v(" "),
          _c("v-date-picker", {
            attrs: {
              "no-title": "",
              scrollable: "",
              color: "date_select",
              max: _vm.frappe.datetime.add_days(_vm.frappe.datetime.now_date(true))
            },
            on: { input: _vm.update_date },
            model: {
              value: _vm.select_date,
              callback: function($$v) {
                _vm.select_date = $$v;
              },
              expression: "select_date"
            }
          })
        ], 1),
        _vm._v(" "),
        _c("v-btn", {
          staticStyle: {
            "max-height": "4vh",
            "margin-top": "1.5vh",
            cursor: "unset"
          },
          attrs: { tonal: "" },
          on: { click: _vm.previous_week }
        }, [
          _c("span", {
            staticStyle: {
              color: "#283593",
              "font-weight": "bold",
              "font-size": "3vh"
            }
          }, [_vm._v(_vm._s("<"))])
        ]),
        _vm._v(" "),
        _c("v-btn", { staticStyle: { "max-height": "4vh", "margin-top": "1.5vh" } }, [
          _c("span", { staticStyle: { color: "#1565C0", "font-weight": "bold" } }, [_vm._v(_vm._s(_vm.current_week))])
        ]),
        _vm._v(" "),
        _c("v-btn", {
          staticStyle: {
            "max-height": "4vh",
            "margin-top": "1.5vh",
            cursor: "unset"
          },
          attrs: { tonal: "" },
          on: { click: _vm.next_week }
        }, [
          _c("span", {
            staticStyle: {
              color: "#283593",
              "font-weight": "bold",
              "font-size": "3vh"
            }
          }, [_vm._v(_vm._s(">"))])
        ]),
        _vm._v(" "),
        _c("v-btn", {
          staticStyle: {
            "max-height": "4vh",
            "margin-top": "1.5vh",
            cursor: "unset"
          },
          attrs: { tonal: "" },
          on: { click: _vm.reset }
        }, [
          _c("span", {
            staticStyle: {
              color: "#D32F2F",
              "font-weight": "bold",
              "font-size": "2vh"
            }
          }, [_vm._v(_vm._s("Reset"))])
        ]),
        _vm._v(" "),
        _c("v-btn", {
          staticStyle: {
            "max-height": "4vh",
            "margin-top": "1.5vh",
            cursor: "unset"
          },
          attrs: { tonal: "" },
          on: { click: _vm.save }
        }, [
          _c("span", {
            staticStyle: {
              color: "#43A047",
              "font-weight": "bold",
              "font-size": "2vh"
            }
          }, [_vm._v(_vm._s("Save"))])
        ]),
        _vm._v(" "),
        _c("v-btn", {
          staticStyle: {
            "max-height": "4vh",
            "margin-top": "1.5vh",
            cursor: "unset"
          },
          on: { click: _vm.submit }
        }, [
          _c("span", {
            staticStyle: {
              color: "#3D5AFE",
              "font-weight": "bold",
              "font-size": "2vh"
            }
          }, [_vm._v(_vm._s("Submit"))])
        ]),
        _vm._v(" "),
        _c("v-btn", {
          staticStyle: {
            "max-height": "4vh",
            "margin-top": "1.5vh",
            cursor: "unset"
          },
          on: { click: _vm.refresh_page }
        }, [
          _c("span", {
            staticStyle: {
              color: "#F4511E",
              "font-weight": "bold",
              "font-size": "2vh"
            }
          }, [_vm._v(_vm._s("Refresh Page"))])
        ])
      ], 1),
      _vm._v(" "),
      _c("v-snackbar", {
        attrs: { timeout: 3500, color: _vm.snackColor, right: "" },
        model: {
          value: _vm.snack,
          callback: function($$v) {
            _vm.snack = $$v;
          },
          expression: "snack"
        }
      }, [_vm._v("\n        " + _vm._s(_vm.snackText) + "\n    ")])
    ], 1);
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  var __vue_inject_styles__ = function(inject) {
    if (!inject)
      return;
    inject("data-v-37caead9_0", { source: "\n.bottom-navigation-class[data-v-37caead9] {\n    height: unset !important;\n	padding-bottom: 10px !important;\n	flex-wrap: wrap !important;\n}\n  ", map: { "version": 3, "sources": ["../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/components/Navbar.vue"], "names": [], "mappings": ";AAwQA;IACA,wBAAA;CACA,+BAAA;CACA,0BAAA;AACA", "file": "Navbar.vue", "sourcesContent": [`<template>
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
<\/script>
<style scoped>
  .bottom-navigation-class {
    height: unset !important;
	padding-bottom: 10px !important;
	flex-wrap: wrap !important;
  }
  </style>
`] }, media: void 0 });
  };
  var __vue_scope_id__ = "data-v-37caead9";
  var __vue_module_identifier__ = void 0;
  var __vue_is_functional_template__ = false;
  function __vue_normalize__(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/components/Navbar.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function(context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__() {
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;
        style.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style.element = style.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index = parseInt(style.element.getAttribute("data-next-index"));
          style.element.setAttribute("data-next-index", index + 1);
        }
        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index])
            style.element.removeChild(nodes[index]);
          if (nodes.length)
            style.element.insertBefore(textNode, nodes[index]);
          else
            style.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__ = /* @__PURE__ */ __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, __vue_create_injector__, void 0, void 0);
  var Navbar_default = __vue_component__;

  // ../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/components/main/Table.vue
  var __vue_script__2 = {
    data() {
      return {
        itemsPerPage: 5,
        submitted_record: false,
        customer_data: [],
        table_row: [],
        table_column_total: [],
        table_total_column_headers: [],
        table_headers: [],
        total_row_id: 0,
        start_date_week: "",
        end_date_week: ""
      };
    },
    methods: {
      add_row_value(item) {
        item.row_total = 0;
        if (item.mon) {
          var value = item.mon.split(".");
          if (value.length == 2) {
            if (!["0", "5"].includes(value[1])) {
              evntBus.$emit("show_mesage", {
                text: __("Allowed Format For Decimal Place Is .0 or .5, So Automatically Resetted To 0."),
                color: "warning"
              });
              item.mon = 0;
            }
          }
          item.row_total = item.row_total + parseFloat(item.mon);
        }
        if (item.tue) {
          var value = item.tue.split(".");
          if (value.length == 2) {
            if (!["0", "5"].includes(value[1])) {
              evntBus.$emit("show_mesage", {
                text: __("Allowed Format For Decimal Place Is .0 or .5, So Automatically Resetted To 0."),
                color: "warning"
              });
              item.tue = 0;
            }
          }
          item.row_total = item.row_total + parseFloat(item.tue);
        }
        if (item.wed) {
          var value = item.wed.split(".");
          if (value.length == 2) {
            if (!["0", "5"].includes(value[1])) {
              evntBus.$emit("show_mesage", {
                text: __("Allowed Format For Decimal Place Is .0 or .5, So Automatically Resetted To 0."),
                color: "warning"
              });
              item.wed = 0;
            }
          }
          item.row_total = item.row_total + parseFloat(item.wed);
        }
        if (item.thu) {
          var value = item.thu.split(".");
          if (value.length == 2) {
            if (!["0", "5"].includes(value[1])) {
              evntBus.$emit("show_mesage", {
                text: __("Allowed Format For Decimal Place Is .0 or .5, So Automatically Resetted To 0."),
                color: "warning"
              });
              item.thu = 0;
            }
          }
          item.row_total = item.row_total + parseFloat(item.thu);
        }
        if (item.fri) {
          var value = item.fri.split(".");
          if (value.length == 2) {
            if (!["0", "5"].includes(value[1])) {
              evntBus.$emit("show_mesage", {
                text: __("Allowed Format For Decimal Place Is .0 or .5, So Automatically Resetted To 0."),
                color: "warning"
              });
              item.fri = 0;
            }
          }
          item.row_total = item.row_total + parseFloat(item.fri);
        }
        if (item.sat) {
          var value = item.sat.split(".");
          if (value.length == 2) {
            if (!["0", "5"].includes(value[1])) {
              evntBus.$emit("show_mesage", {
                text: __("Allowed Format For Decimal Place Is .0 or .5, So Automatically Resetted To 0."),
                color: "warning"
              });
              item.sat = 0;
            }
          }
          item.row_total = item.row_total + parseFloat(item.sat);
        }
        if (item.sun) {
          var value = item.sun.split(".");
          if (value.length == 2) {
            if (!["0", "5"].includes(value[1])) {
              evntBus.$emit("show_mesage", {
                text: __("Allowed Format For Decimal Place Is .0 or .5, So Automatically Resetted To 0."),
                color: "warning"
              });
              item.sun = 0;
            }
          }
          item.row_total = item.row_total + parseFloat(item.sun);
        }
        this.table_column_total[0].mon = 0;
        this.table_row.forEach((item2) => {
          this.table_column_total[0].mon += flt(item2.mon);
        });
        this.table_column_total[0].tue = 0;
        this.table_row.forEach((item2) => {
          this.table_column_total[0].tue += flt(item2.tue);
        });
        this.table_column_total[0].wed = 0;
        this.table_row.forEach((item2) => {
          this.table_column_total[0].wed += flt(item2.wed);
        });
        this.table_column_total[0].thu = 0;
        this.table_row.forEach((item2) => {
          this.table_column_total[0].thu += flt(item2.thu);
        });
        this.table_column_total[0].fri = 0;
        this.table_row.forEach((item2) => {
          this.table_column_total[0].fri += flt(item2.fri);
        });
        this.table_column_total[0].sat = 0;
        this.table_row.forEach((item2) => {
          this.table_column_total[0].sat += flt(item2.sat);
        });
        this.table_column_total[0].sun = 0;
        this.table_row.forEach((item2) => {
          this.table_column_total[0].sun += flt(item2.sun);
        });
        this.table_column_total[0].row_total = flt(this.table_column_total[0].mon) + flt(this.table_column_total[0].tue) + flt(this.table_column_total[0].wed) + flt(this.table_column_total[0].thu) + flt(this.table_column_total[0].fri) + flt(this.table_column_total[0].sat) + flt(this.table_column_total[0].sun);
      },
      add_row() {
        if (!this.submitted_record) {
          this.total_row_id = this.total_row_id + 1;
          this.table_row.push({ "main_row_id": this.total_row_id, "customer_data": this.customer_data, "row_total": 0 });
        } else {
          evntBus.$emit("show_mesage", {
            text: __("Already Submitted, Not Able To Add Row..."),
            color: "error"
          });
        }
      },
      remove_item_update_total_values(item) {
        if (!this.submitted_record) {
          if (1 < this.table_row.length) {
            const index = this.table_row.findIndex((el) => el.main_row_id == item.main_row_id);
            if (index >= 0) {
              this.table_row.splice(index, 1);
            }
            this.add_row_value(item);
          } else {
            evntBus.$emit("show_mesage", {
              text: __("Atleast One Row Needed."),
              color: "error"
            });
          }
        } else {
          evntBus.$emit("show_mesage", {
            text: __("Already Submitted, Not Able To Remove It..."),
            color: "error"
          });
        }
      },
      get_customer_data() {
        var me = this;
        frappe.call({
          method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.get_customer",
          callback: function(r) {
            if (r.message) {
              me.customer_data = r.message;
            }
          }
        });
      },
      update_project_data(item) {
        item.project_name = "";
        if (item.customer_name) {
          var me = item;
          frappe.call({
            method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.get_project",
            args: {
              customer: item.customer_name
            },
            async: false,
            callback: function(r) {
              if (r.message) {
                me.project_data = r.message;
              }
            }
          });
        } else {
          item.project_data = [];
        }
      },
      update_project_name(item) {
        item["project_name"] = "";
        for (var i = 0; i < item.project_data.length; i++) {
          if (item.project == item.project_data[i].name) {
            item["project_name"] = item.project_data[i].project_name;
            break;
          }
        }
      },
      save_or_submit() {
        frappe.call({
          method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.save_or_submit",
          args: {
            start_date_week: this.start_date_week,
            end_date_week: this.end_date_week,
            data: this.table_row,
            type: this.type
          },
          callback: function(r) {
            if (r.message[0]) {
              evntBus.$emit("update_after_save_submit");
              evntBus.$emit("show_mesage", {
                text: r.message[1],
                color: "success"
              });
            } else {
              evntBus.$emit("show_mesage", {
                text: r.message[1],
                color: "error"
              });
            }
          }
        });
      }
    },
    mounted() {
      evntBus.$on("update_main_table_header", (table_headers) => {
        this.table_headers = table_headers;
      });
      evntBus.$on("update_total_table_header", (table_total_column_headers) => {
        this.table_total_column_headers = table_total_column_headers;
      });
      evntBus.$on("main_table_values", (table_row) => {
        this.table_row = table_row;
        this.total_row_id = this.table_row.length - 1;
      });
      evntBus.$on("total_table_values", (table_column_total) => {
        this.table_column_total = table_column_total;
      });
      evntBus.$on("save", (start_date_week, end_date_week) => {
        this.start_date_week = start_date_week;
        this.end_date_week = end_date_week;
        this.type = "Save";
        this.save_or_submit();
      });
      evntBus.$on("submit", (start_date_week, end_date_week) => {
        this.start_date_week = start_date_week;
        this.end_date_week = end_date_week;
        this.type = "Submit";
        this.save_or_submit();
      });
      evntBus.$on("submitted_record", (value) => {
        this.submitted_record = value;
      });
    },
    created: function() {
      this.get_customer_data();
    }
  };
  var __vue_render__2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("v-row", [
      _c("v-card-actions", { staticStyle: { "margin-top": "30px", width: "200vh" } }, [
        _c("v-data-table", {
          attrs: {
            headers: _vm.table_headers,
            items: _vm.table_row,
            "item-key": "main_row_id",
            color: "background",
            "items-per-page": _vm.itemsPerPage
          },
          scopedSlots: _vm._u([
            {
              key: "item.customer_name",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-autocomplete", {
                    staticStyle: { "max-width": "50vh" },
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      items: item.customer_data,
                      "item-text": "name",
                      "item-value": "name",
                      disabled: _vm.submitted_record
                    },
                    on: {
                      change: function($event) {
                        return _vm.update_project_data(item);
                      }
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "item",
                        fn: function(data) {
                          return [
                            [
                              _c("v-list-item-content", [
                                _c("v-list-item-subtitle", {
                                  staticClass: "button--text",
                                  domProps: {
                                    innerHTML: _vm._s("" + data.item.name)
                                  }
                                })
                              ], 1)
                            ]
                          ];
                        }
                      }
                    ], null, true),
                    model: {
                      value: item.customer_name,
                      callback: function($$v) {
                        _vm.$set(item, "customer_name", $$v);
                      },
                      expression: "item.customer_name"
                    }
                  })
                ];
              }
            },
            {
              key: "item.project",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-autocomplete", {
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      items: item.project_data,
                      "item-text": "name",
                      "item-value": "name",
                      disabled: _vm.submitted_record
                    },
                    on: {
                      change: function($event) {
                        return _vm.update_project_name(item);
                      }
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "item",
                        fn: function(data) {
                          return [
                            [
                              _c("v-list-item-content", [
                                _c("v-list-item-subtitle", {
                                  staticClass: "button--text",
                                  domProps: {
                                    innerHTML: _vm._s("ID: " + data.item.name)
                                  }
                                }),
                                _vm._v(" "),
                                _c("v-list-item-subtitle", {
                                  staticClass: "button--text",
                                  domProps: {
                                    innerHTML: _vm._s("Name: " + data.item.project_name)
                                  }
                                })
                              ], 1)
                            ]
                          ];
                        }
                      }
                    ], null, true),
                    model: {
                      value: item.project,
                      callback: function($$v) {
                        _vm.$set(item, "project", $$v);
                      },
                      expression: "item.project"
                    }
                  }),
                  _vm._v(" "),
                  _c("span", [_vm._v(_vm._s(item.project_name))])
                ];
              }
            },
            {
              key: "item.mon",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    on: {
                      change: function($event) {
                        return _vm.add_row_value(item);
                      }
                    },
                    model: {
                      value: item.mon,
                      callback: function($$v) {
                        _vm.$set(item, "mon", $$v);
                      },
                      expression: "item.mon"
                    }
                  })
                ];
              }
            },
            {
              key: "item.tue",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    on: {
                      change: function($event) {
                        return _vm.add_row_value(item);
                      }
                    },
                    model: {
                      value: item.tue,
                      callback: function($$v) {
                        _vm.$set(item, "tue", $$v);
                      },
                      expression: "item.tue"
                    }
                  })
                ];
              }
            },
            {
              key: "item.wed",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    on: {
                      change: function($event) {
                        return _vm.add_row_value(item);
                      }
                    },
                    model: {
                      value: item.wed,
                      callback: function($$v) {
                        _vm.$set(item, "wed", $$v);
                      },
                      expression: "item.wed"
                    }
                  })
                ];
              }
            },
            {
              key: "item.thu",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    on: {
                      change: function($event) {
                        return _vm.add_row_value(item);
                      }
                    },
                    model: {
                      value: item.thu,
                      callback: function($$v) {
                        _vm.$set(item, "thu", $$v);
                      },
                      expression: "item.thu"
                    }
                  })
                ];
              }
            },
            {
              key: "item.fri",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    on: {
                      change: function($event) {
                        return _vm.add_row_value(item);
                      }
                    },
                    model: {
                      value: item.fri,
                      callback: function($$v) {
                        _vm.$set(item, "fri", $$v);
                      },
                      expression: "item.fri"
                    }
                  })
                ];
              }
            },
            {
              key: "item.sat",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    on: {
                      change: function($event) {
                        return _vm.add_row_value(item);
                      }
                    },
                    model: {
                      value: item.sat,
                      callback: function($$v) {
                        _vm.$set(item, "sat", $$v);
                      },
                      expression: "item.sat"
                    }
                  })
                ];
              }
            },
            {
              key: "item.sun",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    on: {
                      change: function($event) {
                        return _vm.add_row_value(item);
                      }
                    },
                    model: {
                      value: item.sun,
                      callback: function($$v) {
                        _vm.$set(item, "sun", $$v);
                      },
                      expression: "item.sun"
                    }
                  })
                ];
              }
            },
            {
              key: "item.row_total",
              fn: function(ref) {
                var item = ref.item;
                return [_c("span", [_vm._v(_vm._s(item.row_total))])];
              }
            },
            {
              key: "item.delete",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-btn", {
                    attrs: { icon: "", color: "button" },
                    on: {
                      click: function($event) {
                        $event.stopPropagation();
                        return _vm.remove_item_update_total_values(item);
                      }
                    }
                  }, [_c("v-icon", [_vm._v("mdi-delete")])], 1)
                ];
              }
            }
          ])
        })
      ], 1),
      _vm._v(" "),
      _c("v-card-actions", [
        _c("v-btn", {
          staticStyle: { color: "#283593", "font-weight": "bold" },
          attrs: { color: "#BBDEFB" },
          on: { click: _vm.add_row }
        }, [_vm._v(_vm._s(_vm.__("Add Row")))])
      ], 1),
      _vm._v(" "),
      _c("v-card-actions", { attrs: { right: "" } }, [
        _c("v-data-table", {
          attrs: {
            headers: _vm.table_total_column_headers,
            items: _vm.table_column_total,
            "item-key": "total_row_id",
            "hide-default-footer": "",
            right: ""
          },
          scopedSlots: _vm._u([
            {
              key: "item.column_total",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    staticStyle: { "max-width": "12vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.column_total,
                      callback: function($$v) {
                        _vm.$set(item, "column_total", $$v);
                      },
                      expression: "item.column_total"
                    }
                  })
                ];
              }
            },
            {
              key: "item.mon",
              fn: function(ref) {
                var item = ref.item;
                return [
                  item.mon > 8 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "background-color": "error",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.mon,
                      callback: function($$v) {
                        _vm.$set(item, "mon", $$v);
                      },
                      expression: "item.mon"
                    }
                  }) : _vm._e(),
                  _vm._v(" "),
                  item.mon < 8.1 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.mon,
                      callback: function($$v) {
                        _vm.$set(item, "mon", $$v);
                      },
                      expression: "item.mon"
                    }
                  }) : _vm._e()
                ];
              }
            },
            {
              key: "item.tue",
              fn: function(ref) {
                var item = ref.item;
                return [
                  item.tue > 8 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "background-color": "error",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.tue,
                      callback: function($$v) {
                        _vm.$set(item, "tue", $$v);
                      },
                      expression: "item.tue"
                    }
                  }) : _vm._e(),
                  _vm._v(" "),
                  item.tue < 8.1 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.tue,
                      callback: function($$v) {
                        _vm.$set(item, "tue", $$v);
                      },
                      expression: "item.tue"
                    }
                  }) : _vm._e()
                ];
              }
            },
            {
              key: "item.wed",
              fn: function(ref) {
                var item = ref.item;
                return [
                  item.wed > 8 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "background-color": "error",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.wed,
                      callback: function($$v) {
                        _vm.$set(item, "wed", $$v);
                      },
                      expression: "item.wed"
                    }
                  }) : _vm._e(),
                  _vm._v(" "),
                  item.wed < 8.1 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.wed,
                      callback: function($$v) {
                        _vm.$set(item, "wed", $$v);
                      },
                      expression: "item.wed"
                    }
                  }) : _vm._e()
                ];
              }
            },
            {
              key: "item.thu",
              fn: function(ref) {
                var item = ref.item;
                return [
                  item.thu > 8 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "background-color": "error",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.thu,
                      callback: function($$v) {
                        _vm.$set(item, "thu", $$v);
                      },
                      expression: "item.thu"
                    }
                  }) : _vm._e(),
                  _vm._v(" "),
                  item.thu < 8.1 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.thu,
                      callback: function($$v) {
                        _vm.$set(item, "thu", $$v);
                      },
                      expression: "item.thu"
                    }
                  }) : _vm._e()
                ];
              }
            },
            {
              key: "item.fri",
              fn: function(ref) {
                var item = ref.item;
                return [
                  item.fri > 8 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "background-color": "error",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.fri,
                      callback: function($$v) {
                        _vm.$set(item, "fri", $$v);
                      },
                      expression: "item.fri"
                    }
                  }) : _vm._e(),
                  _vm._v(" "),
                  item.fri < 8.1 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.fri,
                      callback: function($$v) {
                        _vm.$set(item, "fri", $$v);
                      },
                      expression: "item.fri"
                    }
                  }) : _vm._e()
                ];
              }
            },
            {
              key: "item.sat",
              fn: function(ref) {
                var item = ref.item;
                return [
                  item.sat > 8 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      flat: "",
                      solo: "",
                      readonly: "",
                      "background-color": "error",
                      dense: "",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.sat,
                      callback: function($$v) {
                        _vm.$set(item, "sat", $$v);
                      },
                      expression: "item.sat"
                    }
                  }) : _vm._e(),
                  _vm._v(" "),
                  item.sat < 8.1 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.sat,
                      callback: function($$v) {
                        _vm.$set(item, "sat", $$v);
                      },
                      expression: "item.sat"
                    }
                  }) : _vm._e()
                ];
              }
            },
            {
              key: "item.sun",
              fn: function(ref) {
                var item = ref.item;
                return [
                  item.sun > 8 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "background-color": "error",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.sun,
                      callback: function($$v) {
                        _vm.$set(item, "sun", $$v);
                      },
                      expression: "item.sun"
                    }
                  }) : _vm._e(),
                  _vm._v(" "),
                  item.sun < 8.1 ? _c("v-text-field", {
                    staticStyle: { "max-width": "10vh" },
                    attrs: {
                      dense: "",
                      flat: "",
                      solo: "",
                      readonly: "",
                      "hide-details": "",
                      disabled: _vm.submitted_record
                    },
                    model: {
                      value: item.sun,
                      callback: function($$v) {
                        _vm.$set(item, "sun", $$v);
                      },
                      expression: "item.sun"
                    }
                  }) : _vm._e()
                ];
              }
            },
            {
              key: "item.row_total",
              fn: function(ref) {
                var item = ref.item;
                return [_c("span", [_vm._v(_vm._s(item.row_total))])];
              }
            }
          ])
        })
      ], 1)
    ], 1);
  };
  var __vue_staticRenderFns__2 = [];
  __vue_render__2._withStripped = true;
  var __vue_inject_styles__2 = void 0;
  var __vue_scope_id__2 = void 0;
  var __vue_module_identifier__2 = void 0;
  var __vue_is_functional_template__2 = false;
  function __vue_normalize__2(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/components/main/Table.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (false) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function(context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  var __vue_component__2 = /* @__PURE__ */ __vue_normalize__2({ render: __vue_render__2, staticRenderFns: __vue_staticRenderFns__2 }, __vue_inject_styles__2, __vue_script__2, __vue_scope_id__2, __vue_is_functional_template__2, __vue_module_identifier__2, false, void 0, void 0, void 0);
  var Table_default = __vue_component__2;

  // ../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/Home.vue
  var __vue_script__3 = {
    data: function() {
      return {
        page: "Table"
      };
    },
    components: {
      Navbar: Navbar_default,
      Table: Table_default
    },
    methods: {
      setPage(page) {
        this.page = page;
      }
    }
  };
  var __vue_render__3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("v-app", { staticClass: "container1" }, [
      _c("v-main", [
        _c("Navbar", {
          on: {
            changePage: function($event) {
              return _vm.setPage($event);
            }
          }
        }),
        _vm._v(" "),
        _c(_vm.page, { tag: "component", staticClass: "mx-4 md-4" })
      ], 1)
    ], 1);
  };
  var __vue_staticRenderFns__3 = [];
  __vue_render__3._withStripped = true;
  var __vue_inject_styles__3 = function(inject) {
    if (!inject)
      return;
    inject("data-v-0ff15170_0", { source: "\n.container1[data-v-0ff15170] {\n  margin-top: 0vh;\n}\n", map: { "version": 3, "sources": ["../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/Home.vue"], "names": [], "mappings": ";AAoCA;EACA,eAAA;AACA", "file": "Home.vue", "sourcesContent": [`<template>
    <v-app class="container1">
      <v-main>
        <Navbar @changePage="setPage($event)"></Navbar>
        <component v-bind:is="page" class="mx-4 md-4"></component>
      </v-main>
    </v-app>
  </template>
  
  <script>
  
  import Navbar from './components/Navbar.vue';
  import Table from './components/main/Table.vue';
  
  export default {
    data: function () {
      return {
        page: 'Table',
      };
    },

    components: {
      Navbar,
      Table
    },

    methods: {
      setPage(page) {
        this.page = page;
      },
    },

  };
  <\/script>
  
  <style scoped>
  .container1 {
    margin-top: 0vh;
  }
  </style>
  `] }, media: void 0 });
  };
  var __vue_scope_id__3 = "data-v-0ff15170";
  var __vue_module_identifier__3 = void 0;
  var __vue_is_functional_template__3 = false;
  function __vue_normalize__3(template, style, script, scope, functional, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    const component = (typeof script === "function" ? script.options : script) || {};
    component.__file = "../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/Home.vue";
    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;
      if (functional)
        component.functional = true;
    }
    component._scopeId = scope;
    if (true) {
      let hook;
      if (false) {
        hook = function(context) {
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
          if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
            context = __VUE_SSR_CONTEXT__;
          }
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        component._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function(context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function(context) {
          style.call(this, createInjector(context));
        };
      }
      if (hook !== void 0) {
        if (component.functional) {
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }
    return component;
  }
  function __vue_create_injector__2() {
    const styles = __vue_create_injector__2.styles || (__vue_create_injector__2.styles = {});
    const isOldIE = typeof navigator !== "undefined" && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]'))
        return;
      const group = isOldIE ? css.media || "default" : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: void 0 });
      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;
        style.ids.push(id);
        if (false) {
          code += "\n/*# sourceURL=" + css.map.sources[0] + " */";
          code += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + " */";
        }
        if (isOldIE) {
          style.element = style.element || document.querySelector("style[data-group=" + group + "]");
        }
        if (!style.element) {
          const head = document.head || document.getElementsByTagName("head")[0];
          const el = style.element = document.createElement("style");
          el.type = "text/css";
          if (css.media)
            el.setAttribute("media", css.media);
          if (isOldIE) {
            el.setAttribute("data-group", group);
            el.setAttribute("data-next-index", "0");
          }
          head.appendChild(el);
        }
        if (isOldIE) {
          index = parseInt(style.element.getAttribute("data-next-index"));
          style.element.setAttribute("data-next-index", index + 1);
        }
        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts.filter(Boolean).join("\n");
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index])
            style.element.removeChild(nodes[index]);
          if (nodes.length)
            style.element.insertBefore(textNode, nodes[index]);
          else
            style.element.appendChild(textNode);
        }
      }
    };
  }
  var __vue_component__3 = /* @__PURE__ */ __vue_normalize__3({ render: __vue_render__3, staticRenderFns: __vue_staticRenderFns__3 }, __vue_inject_styles__3, __vue_script__3, __vue_scope_id__3, __vue_is_functional_template__3, __vue_module_identifier__3, false, __vue_create_injector__2, void 0, void 0);
  var Home_default = __vue_component__3;

  // ../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/timesheethelper.js
  frappe.provide("ts_cloud_gst");
  ts_cloud_gst.timesheethelper = class {
    constructor({ parent }) {
      this.$parent = $(document);
      this.page = parent.page;
      this.make_body();
    }
    make_body() {
      this.$el = this.$parent.find("#body");
      this.vue = new Vue({
        vuetify: new Vuetify({
          rtl: frappe.utils.is_rtl(),
          theme: {
            themes: {
              light: {
                background: "#E3F2FD",
                button: "#283593",
                navigation_field: "#BBDEFB",
                date_select: "#1565C0",
                text: "#1565C0",
                table_field_box: "#82B1FF",
                error: "#EF5350",
                success: "#9CCC65",
                warning: "#FFAB40"
              }
            }
          }
        }),
        el: this.$el[0],
        data: {},
        render: (h) => h(Home_default)
      });
    }
  };
})();
//# sourceMappingURL=ts_cloud_gst.bundle.Q527H2OA.js.map
