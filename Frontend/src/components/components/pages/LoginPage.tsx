import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import {
  errorResponseSchema,
  loginSchema,
  LoginSchemaType,
} from "@/utils/schemas";
import FormButton from "../FormButton";
import { toast } from "react-toastify";
import { loginUser } from "@/utils/backend";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      const apiError = axiosError.response?.data;

      const parsed = errorResponseSchema.safeParse(apiError);

      if (parsed.success) {
        toast.error(parsed.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    login(data);
  };

  return (
    <div className="flex justify-center sm:mt-20 mt-5 bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <FormButton isPending={isPending}>Login</FormButton>
        </form>

        <div className="mt-4 text-center">
          <Link to="/signup" className="text-primary hover:underline">
            Don&apos;t have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
