<template>
  <Card class="shadow-none">
    <template v-slot:content>
      <CustomFormGenerator :spec="formSpec">
        <template #actions="{ v$ }">
          <div class="grid grid-nogutter justify-content-between">
            <Button label="Back" @click="prevPage()" icon="pi pi-angle-left">
            </Button>
            <Button
              label="Next"
              @click="nextPage(v$)"
              icon="pi pi-angle-right"
              icon-pos="right"
              :disabled="v$.$invalid"
            ></Button>
          </div>
        </template>
      </CustomFormGenerator>
    </template>
  </Card>
</template>
<script>
import { onMounted } from "vue";
import { reactive, ref, toRefs, unref } from "@vue/reactivity";
import { required } from "@vuelidate/validators";

import CustomFormGenerator from "../../components/CustomFormGenerator/index.vue";
import { CitiesService } from "../../service/CitiesService";

export default {
  components: { CustomFormGenerator },

  props: {
    formData: Object,
  },

  setup(props, { emit }) {
    onMounted(() =>
      citiesService.value.cities.then((cities) => (regions.value = cities))
    );

    const { formData } = toRefs(props);
    const citiesService = ref(new CitiesService());
    const regions = ref([]);
    const districts = ref([]);

    const formState = reactive({
      region: {},
      district: {},
      street: "",
      block_number: "",
    });

    const prevPage = () => {
      emit("prev-page", { pageIndex: 1 });
    };

    const nextPage = (v$) => {
      emit("next-page", {
        formData: {
          ...formData.value,
          addr: Object.keys(formState).reduce(
            (acc, param) => ({
              ...acc,
              [param]: unref(v$[param].$model) || undefined,
            }),
            {}
          ),
        },
        pageIndex: 1,
      });
    };

    const formSpec = reactive({
      title: "Customer Address",
      subtitle: "The fields marked by (*) are required",
      iconClass: "pi-id-card",

      grids: [
        {
          cols: [
            {
              controlType: "CustomDropdown",
              config: {
                name: "region",
                helpName: "Region",
                label: "Select Region",
                placeholder: "Select Region",
                options: regions,
                optionLabel: "name",
                filter: true,
                validators: [],
                onChange({ value }) {
                  districts.value = value.regions;
                },
              },
            },

            {
              controlType: "CustomDropdown",
              config: {
                name: "district",
                helpName: "District",
                label: "Select District",
                placeholder: "Select District",
                options: districts,
                optionLabel: "name",
                filter: true,
                validators: [],
              },
            },
          ],
        },

        {
          cols: [
            {
              controlType: "CustomInputText",
              config: {
                name: "street",
                helpName: "Street address",
                label: "Enter street address",
                placeholder: "Enter customer's street address",
                validators: [],
              },
            },

            {
              controlType: "CustomInputText",
              config: {
                name: "block_number",
                helpName: "Block/House number",
                label: "Enter block/house number",
                placeholder: "Enter customer's block/house number",
                validators: [],
              },
            },
          ],  
        },
      ],
    });

    return { formSpec, prevPage, nextPage };
  },
};
</script>
