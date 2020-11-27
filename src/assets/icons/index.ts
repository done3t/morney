import Icon from '@/components/Icon.vue';
import Vue from 'vue';

Vue.component('Icon', Icon);

const req = require.context('./', true, /\.svg$/);
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext);
try {
  requireAll(req);
} catch (e) {
  console.error(e);
}
