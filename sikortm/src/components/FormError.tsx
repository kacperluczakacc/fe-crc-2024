type FormError = {
    title: string
}

export default function FormError({title}: FormError){
    return <p className="text-red-700">{title}</p>;
}