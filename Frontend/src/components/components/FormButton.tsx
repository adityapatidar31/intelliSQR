import { Button } from "@/components/ui/button";
import { SyncLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean;
  children: ReactNode;
}

const FormButton = ({
  isPending,
  children,
  className,
  ...props
}: FormButtonProps) => {
  return (
    <Button
      type="submit"
      className={cn("w-full text-white", className)}
      disabled={isPending}
      {...props}
    >
      {isPending ? <SyncLoader color="#fff" size={12} /> : children}
    </Button>
  );
};

export default FormButton;
