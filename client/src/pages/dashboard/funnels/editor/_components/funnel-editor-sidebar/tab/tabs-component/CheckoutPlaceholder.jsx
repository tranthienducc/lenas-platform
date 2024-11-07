const CheckoutPlaceholder = () => {
  const handleDragStart = (e, type) => {
    if (type == null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, "paymentForm")}
      className="flex items-center justify-center rounded-lg cursor-pointer h-14 w-14 bg-muted"
    >
      <img
        src="/assets/icons/stripelogo.png"
        alt="stripe-logo"
        className="object-contain size-10"
      />
    </div>
  );
};

export default CheckoutPlaceholder;
