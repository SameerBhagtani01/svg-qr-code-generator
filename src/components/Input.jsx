export default function Input({ className = "", ...props }) {
    return (
        <input
            {...props}
            className={`rounded-md px-2 py-1 focus:outline-none active:outline-none ${className}`}
        />
    );
}
