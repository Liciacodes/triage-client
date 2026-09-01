type SummaryCardProps = {
    label: string;
    value: number;
}

export default function SummaryCard({label, value}: SummaryCardProps){
return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-sm text-zinc-500">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-zinc-900">
            {value}
        </p>
    </div>
)
}