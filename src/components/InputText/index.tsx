import { useId } from "react";

type InputTextProps = {
    labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputTextProps) {
    const id = useId();

    return (
        <div className="flex flex-col gap-2 my-4">
            {labelText &&
                <label className="text-sm" htmlFor={id}>
                    {labelText}
                </label>
            }
            <input
                {...props}
                className={`bg-white outline-0 ring-2 rounded ring-slate-400 py-2 px-2 transition focus:ring-blue-600 placeholder-slate-300 ${props.className || ''} disabled:bg-slate-200 disabled:placeholder-slate-300 disabled:text-slate-400 read-only:bg-slate-100`}
                id={id}
            />
        </div>
    )
}