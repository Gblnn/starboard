export function ShipLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 21c.6.5 1.2 1 2.4 1 2.4 0 2.4-1.5 4.8-1.5 2.4 0 2.4 1.5 4.8 1.5 2.4 0 2.4-1.5 4.8-1.5 1.2 0 1.8.5 2.4 1" />
      <path d="M19 17v-7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v7" />
      <path d="M12 8V2L8 6" />
      <path d="M12 8V2l4 4" />
    </svg>
  );
}
