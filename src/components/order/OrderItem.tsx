import type { ShopifyOrder } from "../../types/shopify";

const financialStatusMap: Record<ShopifyOrder["financialStatus"], string> = {
  PAID: "Đã thanh toán",
  PENDING: "Chờ thanh toán",
  REFUNDED: "Đã hoàn tiền",
  VOIDED: "Đã hủy",
};

const fulfillmentStatusMap: Record<ShopifyOrder["fulfillmentStatus"], string> =
  {
    FULFILLED: "Đã giao hàng",
    UNFULFILLED: "Chờ xử lý",
    PARTIALLY_FULFILLED: "Đã giao một phần",
    // Thêm các trạng thái khác nếu có
  };

const financialStatusColorMap: Record<ShopifyOrder["financialStatus"], string> =
  {
    PAID: "text-green-600",
    PENDING: "text-yellow-600",
    REFUNDED: "text-gray-600",
    VOIDED: "text-red-600",
  };

const fulfillmentStatusColorMap: Record<
  ShopifyOrder["fulfillmentStatus"],
  string
> = {
  FULFILLED: "text-green-600",
  UNFULFILLED: "text-yellow-600",
  PARTIALLY_FULFILLED: "text-blue-600",
};

// Hàm định dạng ngày
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Hàm định dạng giá
const formatPriceVND = (amount: number, currency: string) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency }).format(
    amount
  );
};

export default function OrderItem({ order }: { order: ShopifyOrder }) {
  const financialStatusText =
    financialStatusMap[order.financialStatus] || order.financialStatus;
  const fulfillmentStatusText =
    fulfillmentStatusMap[order.fulfillmentStatus] || order.fulfillmentStatus;

  const financialStatusColor =
    financialStatusColorMap[order.financialStatus] || "text-gray-600";
  const fulfillmentStatusColor =
    fulfillmentStatusColorMap[order.fulfillmentStatus] || "text-gray-600";

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start pb-4 border-b">
        <div>
          <p className="font-bold text-lg">Đơn hàng #{order.orderNumber}</p>
          <p className="text-sm text-gray-500">
            Đặt ngày: {formatDate(order.processedAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">
            {formatPriceVND(
              parseFloat(order.totalPrice.amount),
              order.totalPrice.currencyCode
            )}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {order.lineItems.edges.map((line) => (
          <div
            key={line.node.variant?.image?.url || line.node.title}
            className="flex items-center gap-4"
          >
            <img
              src={line.node.variant?.image?.url || ""}
              alt={line.node.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-grow">
              <p className="font-medium">{line.node.title}</p>
              <p className="text-sm text-gray-500">
                Số lượng: {line.node.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t text-sm">
        <span className="font-medium">
          Trạng thái thanh toán:
          {/* Áp dụng màu và hiển thị text đã dịch */}
          <span className={`font-semibold ${financialStatusColor}`}>
            {" "}
            {financialStatusText}
          </span>
        </span>
        <span className="font-medium">
          Trạng thái giao hàng:
          {/* Áp dụng màu và hiển thị text đã dịch */}
          <span className={`font-semibold ${fulfillmentStatusColor}`}>
            {" "}
            {fulfillmentStatusText}
          </span>
        </span>
      </div>
    </div>
  );
}
