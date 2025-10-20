import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

interface NotificationProps {
  title: string;
  description: string;
  buttonText: string | null;
  buttonLink: string | null;
  type: "success" | "error" | "warning" | "info";
}

function Notification({
  title,
  description,
  buttonText,
  buttonLink,
  type,
}: NotificationProps) {
  // Icon and color mapping based on notification type
  const getNotificationConfig = (type: string) => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          iconColor: "text-green-500",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      case "error":
        return {
          icon: XCircle,
          iconColor: "text-red-500",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      case "warning":
        return {
          icon: AlertCircle,
          iconColor: "text-yellow-500",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
        };
      case "info":
      default:
        return {
          icon: Info,
          iconColor: "text-blue-500",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
    }
  };

  const config = getNotificationConfig(type);
  const IconComponent = config.icon;

  const hasButton = buttonText && buttonLink;

  return (
    <div className="h-130 bg-gray-50 flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-4">
        <div className="w-full max-w-2xl flex flex-col items-center gap-8">
          {/* Notification card */}
          <div
            className={`w-full max-w-lg ${config.bgColor} border ${config.borderColor} rounded-3xl p-10 md:p-14 text-center`}
          >
            <div className="space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                <div
                  className={`w-16 h-16 ${config.iconColor} flex items-center justify-center`}
                >
                  <IconComponent className="w-16 h-16" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-medium text-gray-700">
                {decodeURIComponent(title)}
              </h1>

              {/* Description */}
              <p className="text-gray-500 text-base leading-relaxed">
                {decodeURIComponent(description)}
              </p>

              {/* Action button */}
              {hasButton ? (
                <div className="pt-4">
                  <a
                    href={buttonLink}
                    className="inline-flex items-center justify-center w-full h-16 bg-black text-white rounded-full text-xl font-normal hover:bg-gray-800 transition-colors"
                  >
                    {decodeURIComponent(buttonText)}
                  </a>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
