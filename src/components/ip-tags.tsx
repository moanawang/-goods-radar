type IpTagsProps = {
  ips: string[];
};

export function IpTags({ ips }: IpTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ips.map((ip) => (
        <span
          key={ip}
          className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-[#2e7d32]"
        >
          {ip}
        </span>
      ))}
    </div>
  );
}
