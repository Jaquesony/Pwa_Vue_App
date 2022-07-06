import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "./pages/NotFound.vue";
import { AuthService } from "./service/AuthService";
import useAuth from "@/firebase/auth/useAuth"

const { isAuthenticated } = useAuth();

const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("./pages/Dashboard/CRMDashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/clients",
    name: "customers",
    component: () => import("./pages/Clients/index.vue"),
    children: [
      {
        path: "",
        name: "ListCustomer",
        component: () => import("./pages/Clients/ListCustomer.vue"),
        children: [
          {
            path: "",
            name: "EditCustomer",
            component: () => import("./pages/Clients/_EditCustomer.vue"),
          },
        
        ],
      },
      {
        path: "create",
        name: "CustomerCreate",
        component: () => import("./pages/Clients/CustomerCreate.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/clients/:customerId",
    name: "EditCustomer",
    component: () => import("./pages/Clients/_EditCustomer.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/billings",
    name: "billing",
    component: () => import("./pages/Billings/index.vue"),
    children: [
      {
        path: "",
        name: "list",
        component: () => import("./pages/Billings/BillingList.vue"),
        children: [],
      },
      {
        path: "delayed",
        name: "delayed",
        component: () => import("./pages/Billings/CreateInvoice.vue"),
        children: [
          {
            path: "",
            name: "basic",
            component: () => import("./pages/Billings/_BillingInfo.vue"),
          },
          {
            path: "2",
            name: "address",
            component: () => import("./pages/Billings/_BillingDetail.vue"),
          },
        ],
      },
      {
        path: "/billings/:customerId",
        name: "CreteInvoice",
        component: () => import("./pages/Billings/CreateInvoice.vue"),
      }
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/billings/all",
    name: "allinvoice",
    component: () => import("./pages/Billings/filterInvoice/All.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/billings/pending",
    name: "pendinginvoice",
    component: () => import("./pages/Billings/filterInvoice/Pending.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/billings/won",
    name: "woninvoice",
    component: () => import("./pages/Billings/filterInvoice/Won.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/billings/lost",
    name: "lostinvoice",
    component: () => import("./pages/Billings/filterInvoice/Lost.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/billings/single/:invoiceId",
    name: "billingsingle",
    component: () => import("./pages/Billings/single/InvoiceSingleInf.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/billings/reminder/:invoiceId",
    name: "billingsreminder",
    component: () => import("./pages/Billings/reminder/InvoiceReminder.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./pages/Profile/index.vue"),
    children: [],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/Login/index.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/secret",
    name: "Secret",
    component: () => import("./pages/secret.vue"),
    beforeEnter: (to, from, next) => {
      console.log(!isAuthenticated);
      if(!isAuthenticated.value) {
        next("/login");
      }
      next();
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;