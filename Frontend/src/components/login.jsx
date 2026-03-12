import { useNavigate } from "react-router-dom";
import API from "../API/axios";
import { useState } from "react";
import UseNotify from "../../snackBar/snackBar";
import CircularIndeterminate from "./circularProgress";
import { GraduationCap, ShieldCheck, User, ArrowRight } from "lucide-react";
export default function Login() {
  const { notifyError, notifySuccess } = UseNotify();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    passWord: "",
    role: "admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const roles = [
    {
      id: "student",
      label: "Student",
      description: "Access courses, grades, and schedules",
      icon: GraduationCap,
    },
    {
      id: "lecturer",
      label: "Lecturer",
      description: "Manage classes, grades, and attendance",
      icon: User,
    },
    {
      id: "admin",
      label: "Admin",
      description: "Full access to records and settings",
      icon: ShieldCheck,
    },
  ];

  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post(`/user/login/${formData.role}`, formData);
      if (res?.data) {
        notifySuccess("Login successful!");
        setLoading(false);
        localStorage.setItem(
          "portalUser",
          JSON.stringify({ role: formData.role, email: formData.email })
        );
        const target =
          formData.role === "lecturer"
            ? "/lecturer"
            : formData.role === "student"
            ? "/student"
            : "/admin";
        navigate(target, { state: res.data });
      }
    } catch (error) {
      notifyError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen bg-background-alt text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(80%_80%_at_0%_0%,rgba(79,70,229,0.5),rgba(10,14,26,0.1))] border border-white/10 shadow-2xl p-8">
          <div className="absolute -top-24 -right-24 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-green-500/20 blur-3xl" />
          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-widest">
              Campus Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Welcome back,
              <br />
              sign in to continue.
            </h1>
            <p className="text-sm text-white/70 max-w-md">
              Choose your role to personalize your workspace and access the
              right tools instantly.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive = formData.role === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, role: role.id }))
                    }
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
                      isActive
                        ? "border-white/50 bg-white/15"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          isActive ? "bg-white text-black" : "bg-white/10"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="font-semibold">{role.label}</div>
                        <div className="text-xs text-white/60">
                          {role.description}
                        </div>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-xs uppercase tracking-widest text-white/80">
                        Selected
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-[radial-gradient(80%_80%_at_0%_0%,rgba(79,70,229,0.5),rgba(10,14,26,0.1))] p-8 shadow-2xl border border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Sign in</h2>
              <p className="text-sm text-muted">
                Enter your credentials to access the portal
              </p>
            </div>
            <div className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-primary">
              {roles.find((r) => r.id === formData.role)?.label || "Admin"}
            </div>
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmitt}>
            <div className="space-y-2">
              <label className="text-sm text-muted">Username</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. name@school.edu"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted">Password</label>
              <input
                type="password"
                name="passWord"
                value={formData.passWord}
                onChange={handleChange}
                placeholder="********"
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-muted">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border" />
                Remember me
              </label>
              <button type="button" className="hover:text-blue-600">
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="my-button w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <CircularIndeterminate />
              ) : (
                <>
                  Continue <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
          <div className="mt-6 rounded-2xl bg-cream px-4 py-3 text-xs text-primary">
            Tip: Select the correct role to access the right portal after login.
          </div>
        </div>
      </div>
    </div>
  );
}
