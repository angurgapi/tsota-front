import Vue from 'vue'
import ShowToast from '@/mixins/ShowToast'

if (!Vue.__show_message_mixin__) {
  Vue.__show_message_mixin__ = true
  Vue.mixin(ShowToast)
}
