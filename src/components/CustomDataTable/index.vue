<template>
  <div class="grid">
    <div class="col-12">
      <Message severity="error" v-if="error">{{ error.message }}</Message>
    </div>
    <div class="col-12">
      <div class="relative">
        <Transition name="fade" mode="out-in">
          <!-- <DataTable
            :value="skeletons"
            v-if="loading"
            class="absolute top-0 left-0 w-full"
          >
            <template #header>
              <div
                class="
                  flex flex-column
                  md:flex-row md:justify-content-between md:align-items-center
                "
              >
                <h5 class="m-0">{{ title }}</h5>
                <span class="block mt-2 md:mt-0 p-input-icon-right">
                  <i
                    class="pi"
                    :class="{
                      'pi-search': !searching,
                      'pi-spin pi-spinner': searching,
                    }"
                  />
                  <InputText v-model="searchQuery" :placeholder="placeholder" />
                </span>
              </div>
            </template>

            <template #paginatorstart>
              <Skeleton size="48px" borderRadius="16px"></Skeleton>
            </template>
            <template #paginatorend>
              <Skeleton size="48px" borderRadius="16px"></Skeleton>
            </template>

            <Column
              :selectionMode="selectionMode"
              headerStyle="width: 3em"
              v-if="selectionMode !== 'none'"
            >
            </Column>

            <Column
              v-for="(column, i) in columns"
              :key="i"
              :field="column.name"
              :header="column.label"
              :sortable="column.sortable"
            >
              <template #body>
                <span class="flex justify-content-end" v-if="column.actions">
                  <Skeleton></Skeleton>
                </span>
                <span v-else>
                  <Skeleton></Skeleton>
                </span>
              </template>
            </Column>
          </DataTable> -->
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
                :selectionMode="selectionMode"
                v-model:selection="selections"
                dataKey="id"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                responsiveLayout="scroll"
                @page="onPageChanged"
                @sort="onPageOrderChanged"
              >
                <template #paginatorstart>
                  <Button
                    type="button"
                    icon="pi pi-refresh"
                    class="p-button-text"
                  />
                </template>
                <template #paginatorend>
                  <Button
                    type="button"
                    icon="pi pi-cloud-download"
                    class="p-button-text"
                  />
                </template>

                <template #empty>
                  {{ emptyText || "Items not found!" }}
                </template>

                <template #header>
                  <div
                    class="
                      flex flex-column
                      md:flex-row
                      md:justify-content-between
                      md:align-items-center
                    "
                  >
                    <h5 class="m-0">{{ title }}</h5>
                    <span class="block mt-2 md:mt-0 p-input-icon-right">
                      <i
                        class="pi"
                        :class="{
                          'pi-search': !searching,
                          'pi-spin pi-spinner': searching,
                        }"
                      />
                      <InputText
                        v-model="searchQuery"
                        :placeholder="placeholder"
                      />
                    </span>
                  </div>
                </template>

                <Column
                  :selectionMode="selectionMode"
                  headerStyle="width: 3em"
                  v-if="selectionMode !== 'none'"
                ></Column>

                <Column
                  v-for="(column, i) in columns"
                  :key="i"
                  :field="column.name"
                  :header="column.label"
                  :sortable="column.sortable"
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
import useFetchPage from "../../composables/useFetchPage";

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

    return {
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
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
  /*transform: translateY(30px);*/
}

.fade-leave-to {
  opacity: 0;
  /*transform: translateY(-30px);*/
}
</style>
