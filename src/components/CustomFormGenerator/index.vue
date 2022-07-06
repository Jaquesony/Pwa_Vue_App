<template>
  <form>
    <h5 class="mb-1">{{ spec.title }}</h5>
    <small>{{ spec.subtitle }}</small>

    <!-- Nice divider -->

    <Divider align="left">
      <div class="inline-flex align-items-center" v-if="spec.iconClass">
        <i class="pi mr-2" :class="spec.iconClass"></i>
      </div>
    </Divider>

    <!-- Form UI -->
    <div class="formgrid grid" v-for="(grid, i) in spec.grids" :key="i">
      <div class="field col" v-for="(control, j) in grid.cols" :key="j">
        <CustomFormControl
          ref="ctrls"
          :controlType="control.controlType"
          :config="control.config"
          :validator="v$[control.config.name]"
        >
        </CustomFormControl>
      </div>
    </div>

    <slot name="actions" v-bind="{ v$ }">
      <Button :label="spec.submitLabel || 'Submit'" :disabled="v$.$invalid" />
    </slot>
  </form>
</template>
<script>
import { ref, toRefs, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";

import CustomFormControl from "../CustomFormControl/index.vue";

export default {
  components: { CustomFormControl },

  props: {
    spec: {
      title: String,
      subtitle: String,
      iconClass: String,
      validate: {
        type: Function,
        default: () => () => true,
      },
      grids: {
        type: Array,
      },
    },
  },

  setup(props, { expose }) {
    const ctrls = ref([]);
    /** @type { Ref<Array<*>> } */
    const { spec } = toRefs(props);

    // Interate grids/cols and create validators for each
    const rules = reactive(
      spec.value.grids
        .map((grid) =>
          grid.cols.reduce(
            (acc, col) => ({
              ...acc,
              [col.config.name]: col.config.validators,
            }),
            {}
          )
        )
        .reduce((acc, grid) => ({ ...acc, ...grid }), {})
    );
    const values = reactive(
      spec.value.grids
        .map((grid) =>
          grid.cols.reduce(
            (acc, col) => ({ ...acc, [col.config.name]: col.config.model }),
            {}
          )
        )
        .reduce((acc, grid) => ({ ...acc, ...grid }), {})
    );

    const reset = () => {
      console.log("resetting form");
      v$.value.$reset();
    };

    // Expose form resetting validation
    expose({ reset });

    // This will collect all the validation errors from the
    // nested components.
    const v$ = useVuelidate(rules, values);

    return { ctrls, v$ };
  },
};
</script>

