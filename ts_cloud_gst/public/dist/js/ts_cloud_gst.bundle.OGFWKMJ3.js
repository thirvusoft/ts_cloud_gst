(() => {
  // ../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/bus.js
  var evntBus = new Vue();

  // ../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/components/Navbar.vue
  var __vue_script__ = {
    data() {
      return {
        current_week: "",
        select_date: "",
        allow_date_picker: false
      };
    },
    methods: {
      update_date() {
        this.allow_date_picker = false;
        this.get_week();
      },
      get_week() {
        var me = this;
        frappe.call({
          method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.find_week",
          args: {
            date: this.select_date
          },
          callback: function(r) {
            if (r.message) {
              me.current_week = r.message[0];
              evntBus.$emit("update_main_table_header", r.message[1]);
              evntBus.$emit("update_total_table_header", r.message[2]);
              evntBus.$emit("main_table_values", r.message[3]);
              evntBus.$emit("total_table_values", r.message[4]);
            }
          }
        });
      },
      go_desk() {
        frappe.set_route("/");
        location.reload();
      },
      logOut() {
        var me = this;
        me.logged_out = true;
        return frappe.call({
          method: "logout",
          callback: function(r) {
            if (r.exc) {
              return;
            }
            frappe.set_route("/login");
            location.reload();
          }
        });
      }
    },
    created: function() {
      this.select_date = frappe.datetime.now_date();
      this.get_week();
    }
  };
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("nav", [
      _c("v-app-bar", {
        staticClass: "elevation-2",
        attrs: { app: "", height: "40", color: "background" }
      }, [
        _c("v-toolbar-title", [
          _c("span", { staticStyle: { color: "#1565C0", "font-size": "4vh" } }, [_vm._v("TSheets")])
        ]),
        _vm._v(" "),
        _c("v-spacer")
      ], 1),
      _vm._v(" "),
      _c("v-bottom-navigation", {
        staticStyle: {
          "max-height": "7vh",
          height: "7vh",
          "margin-top": "13px"
        },
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
                      "margin-left": "0vh",
                      "max-width": "30vh"
                    }
                  }, "v-btn", attrs, false), on), [
                    _c("span", {
                      staticStyle: {
                        color: "#283593",
                        "font-weight": "bold"
                      },
                      attrs: { right: "" }
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
            "margin-left": "5vh",
            "max-height": "7vh",
            cursor: "unset"
          }
        }, [
          _c("span", {
            staticStyle: {
              color: "#283593",
              "font-weight": "bold",
              "font-size": "3vh"
            },
            attrs: { right: "" }
          }, [_vm._v(_vm._s("<"))])
        ]),
        _vm._v(" "),
        _c("span", {
          staticStyle: {
            "margin-top": "12px",
            "margin-left": "2vh",
            color: "#1565C0",
            "font-weight": "bold"
          }
        }, [_vm._v(_vm._s(_vm.current_week))]),
        _vm._v(" "),
        _c("v-btn", {
          staticStyle: {
            "margin-left": "2vh",
            "max-height": "7vh",
            cursor: "unset"
          }
        }, [
          _c("span", {
            staticStyle: {
              color: "#283593",
              "font-weight": "bold",
              "font-size": "3vh"
            },
            attrs: { right: "" }
          }, [_vm._v(_vm._s(">"))])
        ]),
        _vm._v(" "),
        _c("v-btn", {
          staticStyle: {
            "margin-left": "80vh",
            "max-height": "7vh",
            cursor: "unset"
          }
        }, [
          _c("span", {
            staticStyle: {
              color: "#283593",
              "font-weight": "bold",
              "font-size": "2vh"
            },
            attrs: { right: "" }
          }, [_vm._v(_vm._s("Reset"))])
        ]),
        _vm._v(" "),
        _c("v-btn", {
          staticStyle: {
            "margin-left": "3vh",
            "max-height": "7vh",
            cursor: "unset"
          }
        }, [
          _c("span", {
            staticStyle: {
              color: "#283593",
              "font-weight": "bold",
              "font-size": "2vh"
            },
            attrs: { right: "" }
          }, [_vm._v(_vm._s("Save"))])
        ]),
        _vm._v(" "),
        _c("v-btn", {
          staticStyle: {
            "margin-left": "3vh",
            "max-height": "7vh",
            cursor: "unset"
          }
        }, [
          _c("span", {
            staticStyle: {
              color: "#283593",
              "font-weight": "bold",
              "font-size": "2vh"
            },
            attrs: { right: "" }
          }, [_vm._v(_vm._s("Submit"))])
        ])
      ], 1)
    ], 1);
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  var __vue_inject_styles__ = void 0;
  var __vue_scope_id__ = void 0;
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
  var __vue_component__ = /* @__PURE__ */ __vue_normalize__({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, void 0, void 0, void 0);
  var Navbar_default = __vue_component__;

  // ../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/components/main/Table.vue
  var __vue_script__2 = {
    data() {
      return {
        itemsPerPage: 5,
        customer_data: [],
        table_row: [],
        table_column_total: [],
        table_total_column_headers: [],
        table_headers: [],
        total_row_id: 0
      };
    },
    methods: {
      add_row() {
        this.total_row_id = this.total_row_id + 1;
        this.table_row.push({ "main_row_id": this.total_row_id, "customer_data": this.customer_data, "row_total": 0 });
      },
      remove_item(item) {
        const index = this.table_row.findIndex((el) => el.main_row_id == item.main_row_id);
        if (index >= 0) {
          this.table_row.splice(index, 1);
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
      });
      evntBus.$on("total_table_values", (table_column_total) => {
        this.table_column_total = table_column_total;
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      items: item.customer_data,
                      "item-text": "name",
                      "item-value": "name"
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
                                    innerHTML: _vm._s("ID: " + data.item.name)
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
                      "item-text": "project_name",
                      "item-value": "name"
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
                  })
                ];
              }
            },
            {
              key: "item.mon",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.mon
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.tue
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.wed
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.thu
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.fri
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.sat
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.sun
                    }
                  })
                ];
              }
            },
            {
              key: "item.row_total",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      readonly: "",
                      value: item.row_total
                    }
                  })
                ];
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
                        return _vm.remove_item(item);
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
      _c("v-card-actions", { staticStyle: { "margin-top": "-26vh", "margin-left": "3vh" } }, [
        _c("v-btn", {
          staticStyle: {
            "margin-left": "0vh",
            color: "#283593",
            "font-weight": "bold"
          },
          attrs: { color: "#BBDEFB" },
          on: { click: _vm.add_row }
        }, [_vm._v(_vm._s(_vm.__("Add Row")))])
      ], 1),
      _vm._v(" "),
      _c("v-card-actions", {
        staticStyle: {
          "margin-top": "-2vh",
          "margin-left": "5vh",
          "max-width": "165vh"
        }
      }, [
        _c("v-data-table", {
          attrs: {
            headers: _vm.table_total_column_headers,
            items: _vm.table_column_total,
            "item-key": "total_row_id",
            "hide-default-footer": ""
          },
          scopedSlots: _vm._u([
            {
              key: "item.column_total",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      readonly: "",
                      value: item.column_total
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
                  _c("v-text-field", {
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.mon
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.tue
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.wed
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.thu
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.fri
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.sat
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
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      value: item.sun
                    }
                  })
                ];
              }
            },
            {
              key: "item.row_total",
              fn: function(ref) {
                var item = ref.item;
                return [
                  _c("v-text-field", {
                    attrs: {
                      dense: "",
                      outlined: "",
                      color: "table_field_box",
                      "hide-details": "",
                      readonly: "",
                      value: item.row_total
                    }
                  })
                ];
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
      },
      remove_frappe_nav() {
        this.$nextTick(function() {
          $(".page-head").remove();
          $(".navbar.navbar-default.navbar-fixed-top").remove();
        });
      }
    },
    mounted() {
      this.remove_frappe_nav();
    },
    updated() {
    },
    created: function() {
      setTimeout(() => {
        this.remove_frappe_nav();
      }, 1e3);
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
    inject("data-v-5b125e28_0", { source: "\n.container1[data-v-5b125e28] {\n  margin-top: 0px;\n}\n", map: { "version": 3, "sources": ["../ts_cloud_gst/ts_cloud_gst/public/js/timesheet_helper/Home.vue"], "names": [], "mappings": ";AA+CA;EACA,eAAA;AACA", "file": "Home.vue", "sourcesContent": [`<template>
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
      remove_frappe_nav() {
        this.$nextTick(function () {
          $('.page-head').remove();
          $('.navbar.navbar-default.navbar-fixed-top').remove();
        });
      },
    },
    mounted() {
      this.remove_frappe_nav();
    },
    updated() {},
    created: function () {
      setTimeout(() => {
        this.remove_frappe_nav();
      }, 1000);
    },
  };
  <\/script>
  
  <style scoped>
  .container1 {
    margin-top: 0px;
  }
  </style>
  `] }, media: void 0 });
  };
  var __vue_scope_id__3 = "data-v-5b125e28";
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
  var __vue_component__3 = /* @__PURE__ */ __vue_normalize__3({ render: __vue_render__3, staticRenderFns: __vue_staticRenderFns__3 }, __vue_inject_styles__3, __vue_script__3, __vue_scope_id__3, __vue_is_functional_template__3, __vue_module_identifier__3, false, __vue_create_injector__, void 0, void 0);
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
      this.$el = this.$parent.find(".main-section");
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
                table_field_box: "#82B1FF"
              }
            }
          }
        }),
        el: this.$el[0],
        data: {},
        render: (h) => h(Home_default)
      });
    }
    setup_header() {
    }
  };
})();
//# sourceMappingURL=ts_cloud_gst.bundle.OGFWKMJ3.js.map
