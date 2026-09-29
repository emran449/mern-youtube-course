import CommonForm from "@/components/common/form";
import { toast } from "@/components/ui/toast";
import { loginFormControls, } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { data, Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(formData)).then(data=> {
      if(data?.payload?.success) {
        toast.add({
  title: data?.payload?.message || "Login successful",
})
      } else {
        toast.add({
  title: data?.payload?.message || "Login failed. Please check your credentials.",
  variant: "destructive",
})
      }

    })
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
            Don't have an account?
          <Link
            to="/auth/register"
            className="font-semibold ml-2 text-primary hover:underline"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
