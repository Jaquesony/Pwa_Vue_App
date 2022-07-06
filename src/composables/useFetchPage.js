import { onMounted, onUnmounted, ref, unref, watch } from "vue";
import { debounce } from "lodash";

import axiosInstance from "../http";

export default function useFetchPage(
  url,
  options = { page: 1, perPage: 5, order: "-updated_at" }
) {
  const page = ref(options.page);
  const perPage = ref(options.perPage);
  const searchQuery = ref("");
  const items = ref([]);
  const pageContext = ref({ total: 0 });
  const order = ref(options.order);
  const error = ref(null);
  const loading = ref(false);
  const searching = ref(false);

  // An HTTP action to fetch pagination response from an API
  const doFetch = (isSearch = unref(searchQuery).length) => {
    // reset state before fetching..
    error.value = null;
    if (!isSearch) loading.value = true;
    // unref() unwraps potential refs
    return axiosInstance
      .get(unref(url), {
        params: {
          page: unref(page),
          per_page: unref(perPage),
          order: unref(order),
          searchQuery: (unref(searchQuery) || "").split(/\s+/).join(","),
        },
      })
      .then(
        ({
          data: {
            data: { items: data, page_context },
          },
        }) => {
          items.value = data;
          pageContext.value = page_context;
        }
      )
      .catch((err) => (error.value = err))
      .finally(() => (loading.value = false));
  };

  // Debounce the fetch function
  const doSearch = debounce(doFetch, 250);

  // Change pagination
  const setPagination = ({ page: p, rows: r }) => {
    page.value = p + 1;
    perPage.value = r;
  };

  // Change ordering of items
  const setPaginationOrder = (orderParams) => {
    order.value = orderParams;
  };

  onMounted(doFetch);

  const watchers = [];

  watchers.push(watch([page, perPage, order], () => doFetch(false)));
  watchers.push(
    watch(searchQuery, async () => {
      searching.value = true;
      try {
        await doSearch();
      } finally {
        searching.value = false;
      }
    })
  );

  onUnmounted(() => {
    watchers.forEach((unwatch) => unwatch());
  });

  return {
    page,
    perPage,
    order,
    searchQuery,
    items,
    error,
    pageContext,
    loading,
    searching,

    // mutators
    setPagination,
    setPaginationOrder,
  };
}
