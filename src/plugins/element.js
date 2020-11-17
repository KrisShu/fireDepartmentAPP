import Vue from "vue";
import {Select, Option,Input,Autocomplete } from "element-ui"; // 按需引入
import "element-ui/lib/theme-chalk/index.css";

Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Input.name, Input);
Vue.component(Autocomplete.name, Autocomplete);