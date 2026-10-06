import { useEffect, useState } from "react";

export const Greeting = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    User = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-1">
      <h1 className="flex items-center justify-center bg-bgcolor2 text-2xl font-semibold tracking-tight text-white">
        Hello,
        <span className="ml-2 text-green-600">{user?.name || "User"}</span>
      </h1>

      <p className="flex items-center justify-center bg-bgcolor2 text-sm text-blue-50">
        {today}
      </p>
    </div>
  );
};
