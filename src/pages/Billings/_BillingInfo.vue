<template>
  <Card class="shadow-none">
    <template v-slot:content>
      <CustomFormGenerator :spec="formSpec">
        <template #actions="{ v$ }">
          <div class="grid grid-nogutter justify-content-between">
            <i></i>
            <Button
              label="Confirm"
              @click="nextPage(v$)"
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
import { reactive, toRefs, unref } from "@vue/reactivity";
import { email, required } from "@vuelidate/validators";
import CustomFormGenerator from "../../components/CustomFormGenerator/index.vue";

export default {
  components: { CustomFormGenerator },

  props: {
    formData: Object,
  },

  setup(props, { emit }) {
    const { formData } = toRefs(props);
    const formState = reactive({
      first: unref(formData.value?.customer?.first),
      last: unref(formData.value?.customer?.last),
      other_names: unref(formData.customer?.value?.other_names),
      email: unref(formData.value?.customer?.email),
      phone: unref(formData.value?.customer?.phone),
    });

    const formSpec = reactive({
      title: "Billing Information",

      grids: [
        {
          cols: [
            {
              controlType: "CustomInputText",
              config: {
                name: "first",
                helpName: "First name",
                label: "First Name",
                placeholder: "Enter first Name",
                validators: [],
              },
            },

            {
              controlType: "CustomInputText",
              config: {
                name: "last",
                helpName: "Last Name",
                label: "Last Name",
                placeholder: "Enter last Name",
                validators: [],
              },
            },

            {
              controlType: "CustomInputText",
              config: {
                name: "other_names",
                helpName: "Other Names",
                label: "Other Names",
                placeholder: "Other last Name",
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
                name: "email",
                helpName: "Email address",
                label: "Email address",
                placeholder: "Enter customer's email address",
                validators: [],
              },
            },

            {
              controlType: "CustomInputText",
              config: {
                name: "phone",
                helpName: "Phone number",
                label: "Phone Number",
                placeholder: "Enter customer's phone number",
                validators: [],
              },
            },
          ],
        },
      ],
    });

    const nextPage = (v$) => {
      emit("next-page", {
        formData: {
          ...formData.value,
          customer: Object.keys(formState).reduce(
            (acc, param) => ({
              ...acc,
              [param]: unref(v$[param].$model) || undefined,
            }),
            {}
          ),
        },
        pageIndex: 0,
      });
    };

    return { formSpec, nextPage };
  },
};
</script>
