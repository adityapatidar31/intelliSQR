import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { signupSchema, SignupSchemaType } from "@/utils/schemas";
import FormButton from "../FormButton";
import { toast } from "react-toastify";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (data: SignupSchemaType) => {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/signUp",
        {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = (data: SignupSchemaType) => {
    signup(data);
  };

  return (
    <div className="flex justify-center sm:mt-20 mt-5 bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-primary mb-6">
          Create your account
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
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-sm text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <FormButton isPending={isPending}>Create Account</FormButton>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-primary hover:underline">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
