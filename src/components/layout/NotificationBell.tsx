import { Bell } from "lucide-react";
import { useState } from "react";

const NotificationBell = () => {
  const [count] = useState(3); // Example: 3 notifications

  return (
    <div className="relative cursor-pointer group">
      <Bell className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;