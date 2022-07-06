<template>
    <div>
        <div class="col-12">
        <CustomDataTable
          :columns="columns"
          :dataSourceUrl="url"
          :title="title"
          :placeholder="placeholder"
          :prepareOrder="prepareOrder"
          selectionMode="single"
          emptyText="Customers not found"
        />
      </div>
    </div>
    
</template>

<script setup>
import CustomDataTable from "../../components/CustomDataTable/index1.vue";

import { readonly } from "@vue/reactivity";


import useCompanyInfo from "../../composables/useCompanyInfo";


const {
  companyInfo: { id: companyId },
} = useCompanyInfo();

const url = readonly(`/clients/${companyId}/customers`);
const title = readonly("Customer Management");
const placeholder = readonly("Search customers...");


/**
 * Format a date
 * @param {Date|string} date date to format
 */
const formatDate = (date) =>
  (typeof date === "string" ? new Date(date) : date).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

const prepareOrder = ({ sortField, sortOrder }) => {
  if (sortField === "full_name") {
    return ["first", "last", "other_names"]
      .map((name) => `${sortOrder === -1 ? "-" : "+"}${name}`)
      .join(",");
  }
  return `${sortOrder === -1 ? "-" : "+"}${sortField}`;
};


const columns = [
  {
    name: "name",
    label: "Full Name",
    showFilterMenu: true,
    sortable: true,
    transform: (data) =>
      `<span class="font-bold">${data.customer?.salutation || ""} ${
        data.customer.first
      } ${data.customer.last} ${data.customer?.other_names || ""}</span>`,
  },
  {
    name: "",
    label: "Contacts",
    showFilterMenu: false,
    sortable: false,
    transform: (data) =>
      data.customer?.contacts?.length
        ? `<a href="${
            data.customer.contacts[0].contact_type === "Email"
              ? "mailTo:"
              : "tel:"
          }${
            data.customer.contacts[0].contact_value
          }">${data.customer.contacts[0].contact_value.toLowerCase()}</a>`
        : "<span>n/a</span>",
  },
  {
    name: "",
    label: "Status",
    showFilterMenu: false,
    sortable: false,
    transform: (data) =>
      data.status === "active"
        ? `
      <span class="p-tag p-component p-tag-success p-tag-rounded">
        <span class="p-tag-icon pi pi-check"></span>
        <span class="p-tag-value">${data.status}</span>
      </span>
      `
        : `<span class="p-tag p-component p-tag-danger p-tag-rounded">
        <span class="p-tag-icon pi pi-times"></span>
        <span class="p-tag-value">${data.status}</span>
      </span>`,
  },
  {
    name: "",
    label: "Created On",
    showFilterMenu: false,
    sortable: true,
    transform: (data) => formatDate(data.created_at),
  },
  {
    name: "",
    label: "Lastly Updated On",
    showFilterMenu: false,
    sortable: true,
    transform: (data) => formatDate(data.updated_at),
  },
  {
    name: "",
    label: "Actions",
    showFilterMenu: false,
    actions: [
      { to: (data) => `/customers/${data.customer.id}`, label: "Details" },
    ],
  },
];
</script>