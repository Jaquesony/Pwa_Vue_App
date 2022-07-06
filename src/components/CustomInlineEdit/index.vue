<template>
  <ul class="list-none p-0 m-0">
    <li
      v-for="(row, i) in rows"
      :key="i"
      class="
        flex
        align-items-center
        py-3
        px-2
        border-top-1
        surface-border
        flex-wrap
      "
    >
      <div class="text-500 w-6 md:w-2 font-medium">
        <i v-if="row.iconClass" :class="`${row.iconClass} mr-2`"></i>
        {{ row.label }}
      </div>
      <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
        <div class="flex align-items-center">
          <div class="inline ml-2" v-for="(col, j) in row.cols" :key="j">
            <Inplace
              :active="
                activeIdx === i && !(col.config.disabled || row.disabled)
              "
              :disabled="row.disabled || col.config.disabled"
              @open="activeIdx !== i ? (activeIdx = i) : null"
              @close="activeIdx === i ? (activeIdx = -1) : null"
            >
              <template #display>
                <span
                  class="inline-block pt-2"
                  v-if="/custompassword|custom-password/i.test(col.controlType)"
                >
                  {{
                    col.config.model?.length
                      ? "*".repeat(col.config.model.length)
                      : col.config.placeholder || `Edit ${col.config.label}`
                  }}
                </span>
                <span
                  v-else-if="
                    /customdropdown|custom-dropdown/i.test(col.controlType)
                  "
                >
                  {{
                    dropdownValue(
                      col.config.name,
                      col.config.placeholder
                    )
                  }}
                </span>
                <span v-else
                  >{{
                    col.config.model ||
                    col.config.placeholder ||
                    `Edit ${col.config.label}`
                  }}
                </span>
              </template>
              <template #content>
                <CustomFormControl
                  ref="customCtrls"
                  :controlType="col.controlType"
                  :config="col.config"
                  :validator="v$[col.config.name]"
                  @keyup.enter="activeIdx === i ? (activeIdx = -1) : null"
                  @input="config?.onInput || null"
                ></CustomFormControl>
              </template>
            </Inplace>
          </div>
        </div>
      </div>
      <div class="w-6 md:w-2 flex justify-content-end">
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="activeIdx = -1"
          v-if="activeIdx === i"
        ></Button>
        <Button
          :label="activeIdx === i ? 'Save' : 'Edit'"
          :icon="`pi ${activeIdx === i ? 'pi-save' : 'pi-pencil'}`"
          :disabled="
            row.disabled ||
            (row.cols.length === 1 && row.cols[0].disabled) ||
            row.cols.every((col) => col.disabled)
          "
          class="p-button-text"
          @click="activeIdx === -1 ? (activeIdx = i) : save(row)"
        ></Button>
      </div>
    </li>
  </ul>
</template>
<script>
import { ref, toRefs } from "@vue/reactivity";

import CustomFormControl from "../CustomFormControl/index.vue";

import { useVuelidate } from "@vuelidate/core";

export default {
  // Register input components
  components: {
    CustomFormControl,
  },

  props: {
    rows: Array,
  },

  setup(props, { emit }) {
    const activeIdx = ref(-1);
    const customCtrls = ref([]);

    const isString = (input) => typeof input === "string";

    const isTruthy = (input) => !!input;

    const dropdownValue = (name, placeholder) => {
      const model = v$.value[name].$model;
      if (model.value == null) return `${placeholder}`;
      if (isString(model.value)) return model.value;
      if (Object.keys(model.value || {}) != null) return model.value[name];
      return `Select ${name}`;
    };

    const { rows } = toRefs(props);

    const values = rows.value
      .map((row) =>
        row.cols.reduce(
          (acc, col) => ({ ...acc, [col.config.name]: col.config.model }),
          {}
        )
      )
      .reduce((acc, col) => ({ ...acc, ...col }));
    const rules = rows.value
      .map((row) =>
        row.cols.reduce(
          (acc, col) => ({ ...acc, [col.config.name]: col.config.validators }),
          {}
        )
      )
      .reduce((acc, col) => ({ ...acc, ...col }));

    const v$ = useVuelidate(rules, values);

    const save = (key) => {
      activeIdx.value = -1;
      emit("save", key);
    };

    const cancel = (key) => {
      activeIdx.value = -1;
      emit("cancel", key);
    };

    const handleChange = (key, value) => {
      console.log({ [key]: value });
      emit("change", { [key]: value });
    };

    return {
      activeIdx,
      isString,
      isTruthy,
      dropdownValue,
      handleChange,
      customCtrls,
      v$,
      save,
      cancel,
    };
  },
};
</script>
