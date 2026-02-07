import { formatDateTime } from "@/utils/format-date"
import { formatDistanceToNow } from "date-fns"

type PostDateProps = {
    dateTime: string
}

export function PostDate({ dateTime }: PostDateProps) {
    return (
        <time
            className="text-slate-600 text-sm"
            dateTime={dateTime}
            title={formatDistanceToNow(dateTime)}>
            {formatDateTime(dateTime)}
        </time>
    )
}