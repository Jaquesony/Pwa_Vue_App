<template>
  <component
    :is="controlType"
    v-bind="{ config, validator, required }"
  ></component>
</template>
<script>
import CustomInputText from "./CustomInputText.vue";
import CustomPassword from "./CustomPassword.vue";
import CustomDropdown from "./CustomDropdown.vue";

import { ref, toRef, unref } from "@vue/reactivity";

export default {
  components: {
    CustomInputText,
    CustomPassword,
    CustomDropdown,
  },

  props: {
    /**
     * type of control. Can be any of these
     * @description `CustomInputText`
     */
    controlType: {
      type: String,
      default: "CustomInputText",
      required: true,
      validate(type) {
        return (
          ["CustomInputText", "CustomPassword"].indexOf(
            type.trim().toLowerCase()
          ) !== -1
        );
      },
    },

    /**
     * Configuration for the input component
     */
    config: {
      type: Object,
    },

    /**
     * Validator
     */
    validator: {
      type: Object,
    },
  },

  setup(props) {
    const validator = toRef(props, "validator");
    const required = ref(false);

    for (const key of Object.keys(validator.value)) {
      if (typeof unref(validator)[key] === "function") {
        continue;
      }

      if (
        !isNaN(key) &&
        /required/.test(unref(unref(unref(validator)[key]).$params).type)
      ) {
        required.value = true;
        break;
      }
    }

    return { required };
  },
};
</script>
<style lang="scss">
.required {
  position: relative;
  &::after {
    position: absolute;
    right: -8px;
    content: "*";
    color: var(--pink-500);
  }
}
</style>