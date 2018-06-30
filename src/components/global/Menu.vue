<template lang="pug">
    .menu__wrapper
      button.btn--warning.is-active(@click="isVisible = true")
        slot(name='button')
      .menu(v-if="isVisible", v-click-outside="outside", @click="inside")
        slot(name='body')

</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    outside() {
      this.isVisible = false;
    },
    inside() {
      console.log("clicked inside!");
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }

          console.warn(warn);
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>

