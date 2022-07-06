<template>
  <div class="grid">
    <div class="col-12">
      <Message severity="error" v-if="error">{{ error.message }}</Message>
    </div>
    <div class="col-12">
      <div class="relative">
        <Transition name="fade" mode="out-in">
          <div class="">
            <KeepAlive>
              <DataTable
                :value="items"
                :paginator="true"
                :lazy="true"
                :loading="loading"
                :rows="perPage"
                :totalRecords="pageContext.total"
                :rowsPerPageOptions="[5, 10, 20, 30, 50]"
                @cell-edit-complete="onCellEditComplete"
                class="editable-cells-table"
                filterDisplay="menu"
                v-model:selection="selection"
                showGridlines
                v-model:filters="filters"
                dataKey="id"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                responsiveLayout="scroll"
                :globalFilterFields="[
                  'name',
                  'price',
                  'date',
                  'balance',
                  'status',
                  'code',
                  'activity',
                  'quantity',
                ]"
                @page="onPageChanged"
                @sort="onPageOrderChanged"
              >
                <Column
                  v-for="(column, i) of columns"
                  :field="column.name"
                  :header="column.label"
                  :sortable="column.sortable"
                  :key="i"
                  style="width: 25%"
                  :showFilterMenu="column.showFilterMenu"
                >
                  <template #body="{ data }">
                    <div
                      v-if="column?.actions?.length"
                      class="flex justify-content-end"
                    >
                      <span v-for="(action, j) in column.actions" :key="j">
                        <Button
                          v-if="!action.to"
                          :label="action.label"
                          @click="action.click"
                        />
                        <router-link :to="action?.to(data)" v-else>{{
                          action.label
                        }}</router-link>
                      </span>
                    </div>

                    <span
                      v-else
                      v-html="
                        column.transform
                          ? column.transform(data)
                          : data[column.name]
                      "
                    >
                    </span>
                  </template>
                  <template #filter="{ filterModel, filterCallback }">
                    <InputText
                      type="text"
                      v-model="filters[column.name].value"
                      @keydown.enter="filterCallback()"
                      class="p-column-filter"
                      v-tooltip.top.focus="'Hit enter key to filter'"
                      :placeholder="`Search name -${filterModel.matchMode}`"
                    />
                  </template>
                  <template #editor="{ data, field }">
                    <InputText v-model="data[field]" />
                  </template>
                </Column>
              </DataTable>
            </KeepAlive>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, unref, toRef, ref } from "@vue/reactivity";
import { FilterMatchMode, FilterOperator, FilterService } from "primevue/api";
import useFetchPage from "../../composables/useFetchPage";
import { onMounted } from "vue"

export default {
  props: {
    title: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "Search items...",
    },

    dataSourceUrl: {
      type: String,
      validation(url) {
        return url != null && /^[http://|https://]/.test(url);
      },
    },
    columns: {
      type: Array,
    },

    selectionMode: {
      type: String,
      default: "multiple",
      validation(value) {
        return ["multiple", "single", "none"].includes(value);
      },
    },

    prepareOrder: {
      type: Function,
      default() {
        return () => "";
      },
    },
  },

  setup(props) {
    const dataSourceUrl = toRef(props, "dataSourceUrl");
    const skeletons = computed(() => Array(unref(perPage)));
    const selections = ref([]);
    

    onMounted(() => {
      FilterService.register(FilterMatchMode.CONTAINS, (value, filter) => {
        if (filter === undefined || filter === null || filter.trim() === "") {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.toString() === filter.toString();
      });
    });

    const {
      loading,
      items,
      error,
      perPage,
      searchQuery,
      searching,
      pageContext,
      setPagination,
      setPaginationOrder,
    } = useFetchPage(dataSourceUrl);

    const onPageChanged = (event) => {
      const timer = setTimeout(() => {
        setPagination(event);
        clearTimeout(timer);
      }, 10);
    };

    const onPageOrderChanged = (event) => {
      const params = props.prepareOrder(event);
      setPaginationOrder(params);
    };

    const editingRows = ref([]);

    const statuses = ref([
      { label: "In Stock", value: "INSTOCK" },
      { label: "Low Stock", value: "LOWSTOCK" },
      { label: "Out of Stock", value: "OUTOFSTOCK" },
    ]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      quantity: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      price: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
    });

    const onCellEditComplete = (event) => {
      let { data, newValue, field } = event;

      switch (field) {
        case "quantity":
        case "price":
          if (isPositiveInteger(newValue)) data[field] = newValue;
          else event.preventDefault();
          break;

        default:
          if (newValue.trim().length > 0) data[field] = newValue;
          else event.preventDefault();
          break;
      }
    };
    const isPositiveInteger = (val) => {
      let str = String(val);
      str = str.trim();
      if (!str) {
        return false;
      }
      str = str.replace(/^0+/, "") || "0";
      var n = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 0;
    };

    const getStatusLabel = (status) => {
      switch (status) {
        case "INSTOCK":
          return "In Stock";

        case "LOWSTOCK":
          return "Low Stock";

        case "OUTOFSTOCK":
          return "Out of Stock";

        default:
          return "NA";
      }
    };

    return {
      onCellEditComplete,
      isPositiveInteger,
      filters,
      statuses,
      editingRows,
      getStatusLabel,
      onPageChanged,
      onPageOrderChanged,
      loading,
      skeletons,
      items,
      error,
      searchQuery,
      searching,
      pageContext,
      perPage,
      selections,
    };
  },
};
</script>

<style>
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
