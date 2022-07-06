import { readonly } from "vue";
import { AuthService } from "../service/AuthService";

export default function useAuthInfo() {
  return readonly({
    ...AuthService.getCurrentUserData(),
    companies: undefined,
  });
}
