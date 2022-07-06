import { useRouter } from "vue-router";
import useHttpPost from "./useHttpPost";

export default function useLogout(
  endpoint = "/auth/logout",
  redirect = "/login"
) {
  const { submit, loading, error } = useHttpPost(endpoint);

  const router = useRouter();

  const logout = () => {
    submit({}).finally(() => {
      // Clear session storage
      sessionStorage.clear();
      // Redirect to home
      router.replace(redirect);
    });
  };

  return {
    logout,
    loading,
    error,
  };
}
